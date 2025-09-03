// hairsalon-backend/dbConfig.js
module.exports = {
  user: 'salon_admin',             // ← THAY đúng tên user SQL Server bạn đã tạo
  password: '123456@Admin',        // ← và mật khẩu đã tạo
  server: 'LAPTOP-PBALQHVB',       // ← giống như tên trong SSMS của bạn
  database: 'HTSALON',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

