const sql = require('mssql');
require('dotenv').config({ path: './config.env' });

// Cấu hình kết nối database
const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'OTO',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false, // Tắt mã hóa cho SQL Server local
    trustServerCertificate: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Tạo pool kết nối
const pool = new sql.ConnectionPool(dbConfig);

// Hàm kết nối database
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ Kết nối database thành công!');
    return pool;
  } catch (error) {
    console.error('❌ Lỗi kết nối database:', error.message);
    process.exit(1);
  }
};

// Hàm đóng kết nối database
const closeDB = async () => {
  try {
    await pool.close();
    console.log('🔌 Đã đóng kết nối database');
  } catch (error) {
    console.error('❌ Lỗi đóng kết nối database:', error.message);
  }
};

// Hàm thực thi query
const executeQuery = async (query, params = []) => {
  try {
    const request = pool.request();
    
    // Thêm parameters nếu có
    params.forEach((param, index) => {
      request.input(`param${index + 1}`, param);
    });
    
    const result = await request.query(query);
    return result;
  } catch (error) {
    console.error('❌ Lỗi thực thi query:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  closeDB,
  executeQuery,
  pool
}; 