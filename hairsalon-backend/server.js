// server.js
require('dotenv').config();

const fs        = require('fs');
const path      = require('path');
const express   = require('express');
const cors      = require('cors');
const passport  = require('passport');
const multer    = require('multer');
const sql       = require('mssql');
const { poolConnect, pool } = require('./db');
const createAdminIfNotExist = require('./initAdmin');
const { authenticate, isAdmin } = require('./authMiddleware');

// —————— TỰ ĐỘNG TẠO THƯ MỤC CHO UPLOAD ——————
const ensureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`🟢 Đã tạo thư mục: ${dir}`);
  }
};
ensureDir(path.join(__dirname, 'uploads'));
ensureDir(path.join(__dirname, 'uploads/avatars'));
ensureDir(path.join(__dirname, 'uploads/bookings'));
// ——————————————————————————————————————————

const authRoutes     = require('./routes/authRoutes');
const staffRoutes    = require('./routes/staffRoutes');
const userRoutes     = require('./routes/userRoutes');
const cartRoutes     = require('./routes/cartRoutes');
const productRoutes  = require('./routes/productRoutes');
const orderRoutes    = require('./routes/orderRoutes');
const bookingRoutes  = require('./routes/bookingRouter'); // đúng tên file bookingRouter.js

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// --- MIDDLEWARES ---
// CORS
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (avatars, bookings, ...)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Passport
app.use(passport.initialize());

// --- CẤU HÌNH MULTER CHO AVATAR ---
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/avatars'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.user.id}_${Date.now()}${ext}`);
  }
});
const uploadAvatar = multer({ storage: avatarStorage });

// --- ROUTES ---
// Auth (đăng ký / đăng nhập)
app.use('/api/auth', authRoutes);

// Cart
app.use('/api/cart', cartRoutes);

// Staff list (ai cũng xem được)
app.use('/api/staff', authenticate, staffRoutes);

// User profile (phải đăng nhập)
app.use('/api/users', authenticate, userRoutes);

// Upload avatar
app.put(
  '/api/users/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Chưa có tệp ảnh!' });
      }
      const avatarPath = `/uploads/avatars/${req.file.filename}`;
      await pool.request()
        .input('avatar', sql.VarChar(255), avatarPath)
        .input('id',     sql.Int,       req.user.id)
        .query(`
          UPDATE Users
          SET avatar = @avatar, updatedAt = GETDATE()
          WHERE id = @id
        `);
      res.json({ avatar: avatarPath });
    } catch (err) {
      next(err);
    }
  }
);

// Products (public)
app.use('/api/products', productRoutes);

// Orders dành cho user đã đăng nhập
app.use('/api/orders', authenticate, orderRoutes);

// Orders management (chỉ admin/staff)
app.use('/api/admin/orders', authenticate, isAdmin, orderRoutes);

// Booking (đã cấu hình trong routes/bookingRouter.js)
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🔆 Hair Salon API is up and running!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});

// --- START SERVER sau khi DB kết nối + tạo tài khoản admin nếu chưa có ---
poolConnect
  .then(async () => {
    console.log('🟢 Connected to SQL Server');
    await createAdminIfNotExist();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('🔴 Failed to connect to SQL Server:', err);
  });
