// hairsalon-backend/initAdmin.js
const sql   = require('mssql');
const bcrypt = require('bcrypt');
const config = require('./dbConfig');

async function createAdminIfNotExist () {
  try {
    await sql.connect(config);

    const { recordset } = await sql.query`SELECT 1 FROM Users WHERE username = 'admin'`;

    if (recordset.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);   // ← mật‑khẩu bạn muốn
      await sql.query`
        INSERT INTO Users (username, password, role, createdAt)
        VALUES ('admin', ${hash}, 'admin', GETDATE())
      `;
      console.log('✅ Tạo admin mặc định thành công');
    }
  } catch (e) {
    console.error('❌ Lỗi tạo admin:', e);
  } finally {
    sql.close();
  }
}
module.exports = createAdminIfNotExist;
