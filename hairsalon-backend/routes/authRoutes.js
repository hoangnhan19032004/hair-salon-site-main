// File: routes/authRoutes.js

require('dotenv').config();

const express            = require('express');
const bcrypt             = require('bcryptjs');
const jwt                = require('jsonwebtoken');
const passport           = require('passport');
const { Strategy: GoogleStrategy }   = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const multer             = require('multer');
const sql                = require('mssql');
const nodemailer         = require('nodemailer');

const { pool }           = require('../db.js');
const { authenticate }   = require('../authMiddleware.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/avatars/' });

const JWT_SECRET    = process.env.JWT_SECRET;
const CLIENT_URL    = process.env.CLIENT_URL;
const GOOGLE_ID     = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const FB_ID         = process.env.FB_ID;
const FB_SECRET     = process.env.FB_SECRET;

// --------------- Passport Google Strategy --------------------
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL:  'http://localhost:3000/api/auth/google/callback' // Sửa chính xác callback URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email    = profile.emails[0].value.toLowerCase();
      const username = profile.displayName || 'GoogleUser';

      const rs = await pool.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT id FROM Users WHERE LOWER(email)=@email');

      let userId;
      if (rs.recordset.length) {
        userId = rs.recordset[0].id;
      } else {
        const ins = await pool.request()
          .input('username', sql.NVarChar, username)
          .input('email',    sql.NVarChar, email)
          .input('password', sql.NVarChar, '')   // password trống
          .input('role',     sql.NVarChar, 'user')
          .query(`
            INSERT INTO Users(username,email,password,role,createdAt)
            VALUES(@username,@email,@password,@role,GETDATE());
            SELECT SCOPE_IDENTITY() AS id;
          `);
        userId = ins.recordset[0].id;
      }
      done(null, { id: userId });
    } catch (err) {
      done(err);
    }
  }
));

// --------------- Passport Facebook Strategy --------------------
passport.use(new FacebookStrategy({
    clientID:     FB_ID,
    clientSecret: FB_SECRET,
    callbackURL:  'http://localhost:3000/api/auth/facebook/callback',
    profileFields: ['id','displayName','email']
  },
  async (_, __, profile, done) => {
    try {
      const email    = profile.emails && profile.emails.length ? profile.emails[0].value.toLowerCase() : null;
      const username = profile.displayName || 'FacebookUser';

      if (!email) {
        return done(new Error('Facebook account không cung cấp email'));
      }

      const rs = await pool.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT id FROM Users WHERE LOWER(email)=@email');

      let userId;
      if (rs.recordset.length) {
        userId = rs.recordset[0].id;
      } else {
        const ins = await pool.request()
          .input('username', sql.NVarChar, username)
          .input('email',    sql.NVarChar, email)
          .input('password', sql.NVarChar, '')
          .input('role',     sql.NVarChar, 'user')
          .query(`
            INSERT INTO Users(username,email,password,role,createdAt)
            VALUES(@username,@email,@password,@role,GETDATE());
            SELECT SCOPE_IDENTITY() AS id;
          `);
        userId = ins.recordset[0].id;
      }
      done(null, { id: userId });
    } catch (err) {
      done(err);
    }
  }
));

// Khởi tạo passport
router.use(passport.initialize());

// ----------------- REGISTER -----------------
router.post('/register', async (req, res) => {
  const { fullName, email, phone = '', password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }
  try {
    // Kiểm tra email trùng
    const dup = await pool.request()
      .input('email', sql.NVarChar, email.toLowerCase())
      .query('SELECT 1 FROM Users WHERE LOWER(email)=@email');

    if (dup.recordset.length) {
      return res.status(409).json({ message: 'Email đã được sử dụng' });
    }

    const hash = await bcrypt.hash(password, 10);
    await pool.request()
      .input('username', sql.NVarChar, fullName)
      .input('email', sql.NVarChar, email.toLowerCase())
      .input('phone', sql.NVarChar, phone)
      .input('password', sql.NVarChar, hash)
      .query(`
        INSERT INTO Users(username,email,phone,password,role,createdAt)
        VALUES(@username,@email,@phone,@password,'user',GETDATE())
      `);

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    console.error('Lỗi đăng ký:', err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// ----------------- LOGIN -----------------
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin' });
  }
  try {
    const idf = usernameOrEmail.toLowerCase();
    const rs = await pool.request()
      .input('idf', sql.NVarChar, idf)
      .query(`
        SELECT TOP 1 * FROM Users
        WHERE LOWER(username)=@idf OR LOWER(email)=@idf
      `);

    const user = rs.recordset[0];
    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      role:     user.role,
      username: user.username,
      email:    user.email || null,
      phone:    user.phone || null
    });
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// ----------------- GOOGLE OAuth -----------------
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`${CLIENT_URL}/?token=${token}`);
  }
);

// ----------------- FACEBOOK OAuth -----------------
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`${CLIENT_URL}/?token=${token}`);
  }
);

// ----------------- LẤY THÔNG TIN USER -----------------
router.get('/user', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const rs = await pool.request()
      .input('id', sql.Int, userId)
      .query(`
        SELECT id, username, email, phone, role, avatarUrl, birthday, address
        FROM Users
        WHERE id=@id
      `);

    if (!rs.recordset.length) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    console.error('Lỗi lấy user:', err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// ----------------- CẬP NHẬT PROFILE -----------------
router.put(
  '/profile',
  authenticate,
  upload.single('avatar'),
  async (req, res) => {
    const userId = req.user.id;
    const { username, phone, birthday, address } = req.body;
    const avatarUrl = req.file ? `/uploads/avatars/${req.file.filename}` : null;

    const fields = [];
    const rq = pool.request().input('id', sql.Int, userId);

    if (username)  { fields.push('username=@username');   rq.input('username', sql.NVarChar, username); }
    if (phone)     { fields.push('phone=@phone');         rq.input('phone', sql.NVarChar, phone);         }
    if (birthday)  { fields.push('birthday=@birthday');   rq.input('birthday', sql.Date, birthday);       }
    if (address)   { fields.push('address=@address');     rq.input('address', sql.NVarChar, address);     }
    if (avatarUrl) { fields.push('avatarUrl=@avatarUrl'); rq.input('avatarUrl', sql.NVarChar, avatarUrl); }

    if (!fields.length) {
      return res.json({ message: 'Không có gì thay đổi.' });
    }

    try {
      await rq.query(`
        UPDATE Users
        SET ${fields.join(', ')}
        WHERE id=@id
      `);

      const updated = await pool.request()
        .input('id', sql.Int, userId)
        .query(`
          SELECT id, username, email, phone, role, avatarUrl, birthday, address
          FROM Users
          WHERE id=@id
        `);

      res.json(updated.recordset[0]);
    } catch (err) {
      console.error('Lỗi cập nhật profile:', err);
      res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật' });
    }
  }
);

// ----------------- QUÊN MẬT KHẨU -----------------
router.post('/forgot-password', async (req, res) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng cung cấp đủ email và số điện thoại.'
    });
  }

  try {
    const result = await pool.request()
      .input('email', sql.NVarChar, email.toLowerCase())
      .input('phone', sql.NVarChar, phone)
      .query(`
        SELECT id, username 
        FROM Users 
        WHERE LOWER(email) = @email AND phone = @phone
      `);

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tài khoản khớp với email và số điện thoại đã nhập.'
      });
    }

    const user = result.recordset[0];
    const userId = user.id;
    const username = user.username;

    // Sinh mật khẩu tạm thời
    const generateRandomPassword = (length = 8) => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let pass = '';
      for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pass;
    };
    const tempPasswordPlain = generateRandomPassword();

    const tempPasswordHashed = await bcrypt.hash(tempPasswordPlain, 10);

    await pool.request()
      .input('userId', sql.Int, userId)
      .input('password', sql.NVarChar, tempPasswordHashed)
      .query(`
        UPDATE Users
        SET password = @password
        WHERE id = @userId
      `);

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Khôi phục mật khẩu',
      html: `<p>Xin chào <b>${username}</b>,</p>
             <p>Mật khẩu tạm thời của bạn là: <b>${tempPasswordPlain}</b></p>
             <p>Vui lòng đăng nhập và thay đổi mật khẩu ngay sau khi đăng nhập.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Mật khẩu mới đã được gửi đến email của bạn.'
    });

  } catch (err) {
    console.error('Lỗi ở forgot-password:', err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
