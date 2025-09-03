// routes/userRoutes.js
const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const multer   = require('multer');
const path     = require('path');
const { pool } = require('../db');
const { authenticate, isAdmin } = require('../authMiddleware');

// Multer config for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/avatars')),
  filename:    (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `user_${req.user.id}_${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage });

// All routes below require authentication
router.use(authenticate);

/**
 * GET /api/users/me
 * → Get own profile
 */
router.get('/me', async (req, res) => {
  try {
    const rs = await pool.request()
      .input('id', req.user.id)
      .query(`
        SELECT id, username, email, phone, avatar
        FROM Users
        WHERE id = @id
      `);
    if (!rs.recordset.length) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    res.json(rs.recordset[0]);
  } catch (err) {
    console.error('GET /api/users/me error:', err);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
  }
});

/**
 * PUT /api/users/me
 * → Update own profile
 */
router.put('/me', async (req, res) => {
  const id = req.user.id;
  const { username, email, phone, password } = req.body;
  const updates = [];
  const rq = pool.request().input('id', id);

  if (username) updates.push('username=@username'), rq.input('username', username);
  if (email)    updates.push('email=@email'),     rq.input('email', email);
  if (phone)    updates.push('phone=@phone'),     rq.input('phone', phone);
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    updates.push('password=@password');
    rq.input('password', hash);
  }
  if (!updates.length) {
    return res.status(400).json({ message: 'Không có trường nào để cập nhật' });
  }

  try {
    const sql = `UPDATE Users SET ${updates.join(',')}, updatedAt=GETDATE() WHERE id=@id`;
    const rs  = await rq.query(sql);
    if (!rs.rowsAffected[0]) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    console.error('PUT /api/users/me error:', err);
    res.status(500).json({ message: 'Lỗi server khi cập nhật profile' });
  }
});

/**
 * PUT /api/users/me/avatar
 * → Upload/update own avatar
 */
router.put(
  '/me/avatar',
  upload.single('avatar'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Chưa upload file!' });
    }
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    try {
      await pool.request()
        .input('avatar', avatarPath)
        .input('id',     req.user.id)
        .query(`
          UPDATE Users
          SET avatar=@avatar, updatedAt=GETDATE()
          WHERE id=@id
        `);
      res.json({ avatar: avatarPath });
    } catch (err) {
      console.error('PUT /api/users/me/avatar error:', err);
      res.status(500).json({ message: 'Lỗi server khi cập nhật avatar' });
    }
  }
);
// Backend (Express) – routes/authRoutes.js hoặc userRoutes.js
// Giả sử bạn đã bảo vệ route này bằng JWT và middleware authenticate
router.get('/me', authenticate, async (req, res) => {
  try {
    const userId = req.user.id; 
    // Lấy user từ database, ví dụ dùng mssql
    const result = await db.query('SELECT username, email, phone FROM Users WHERE id = @id', {
      input: { id: userId }
    });
    const user = result.recordset[0];
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});
// From here, only admins:
router.use(isAdmin);

/**
 * GET /api/users
 * → List all users with role='user'
 */
router.get('/', async (req, res) => {
  try {
    const rs = await pool.request()
      .query(`
        SELECT id, username, email, phone, avatar
        FROM Users
        WHERE role='user'
        ORDER BY id DESC
      `);
    res.json(rs.recordset);
  } catch (err) {
    console.error('GET /api/users error:', err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng' });
  }
});

/**
 * GET /api/users/:id
 * → Get one user
 */
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID không hợp lệ' });
  try {
    const rs = await pool.request()
      .input('id', id)
      .query(`
        SELECT id, username, email, phone, avatar
        FROM Users
        WHERE id=@id AND role='user'
      `);
    if (!rs.recordset.length) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }
    res.json(rs.recordset[0]);
  } catch (err) {
    console.error('GET /api/users/:id error:', err);
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết người dùng' });
  }
});

/**
 * PUT /api/users/:id
 * → Update other user
 */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID không hợp lệ' });

  const { username, email, phone, password } = req.body;
  const updates = [];
  const rq = pool.request().input('id', id);
  if (username) updates.push('username=@username'), rq.input('username', username);
  if (email)    updates.push('email=@email'),     rq.input('email', email);
  if (phone)    updates.push('phone=@phone'),     rq.input('phone', phone);
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    updates.push('password=@password');
    rq.input('password', hash);
  }
  if (!updates.length) {
    return res.status(400).json({ message: 'Không có trường nào để cập nhật' });
  }

  try {
    const sql = `UPDATE Users SET ${updates.join(',')}, updatedAt=GETDATE() WHERE id=@id AND role='user'`;
    const rs  = await rq.query(sql);
    if (!rs.rowsAffected[0]) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    console.error('PUT /api/users/:id error:', err);
    res.status(500).json({ message: 'Lỗi server khi cập nhật user' });
  }
});


// DELETE /api/users/:id//

router.delete('/:id', isAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID không hợp lệ' });

  try {
    console.log('→ delete Bookings');
    await pool.request().input('userId', id)
      .query(`DELETE FROM Bookings WHERE userId=@userId`);

    console.log('→ delete Orders');
    await pool.request().input('userId', id)
      .query(`DELETE FROM Orders WHERE userId=@userId`);

    console.log('→ delete UserCarts');
    await pool.request().input('userId', id)
      .query(`DELETE FROM UserCarts WHERE userId=@userId`);

    console.log('→ delete Users');
    const rs = await pool.request().input('id', id)
      .query(`DELETE FROM Users WHERE id=@id AND role='user'`);

    if (!rs.rowsAffected[0]) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }
    res.json({ message: 'Xóa thành công' });

  } catch (err) {
    console.error('Error in DELETE /api/users/:id:', err);
    if (err.number === 547) {
      // Vẫn còn dữ liệu liên quan trên bảng khác
      return res.status(400).json({ message: 'Không thể xóa user vì còn dữ liệu liên quan' });
    }
    res.status(500).json({ message: 'Lỗi server khi xóa user' });
  }
});

module.exports = router;
