const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config.env' });

// Cấu hình kết nối MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'oto',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Hàm thực thi query
const executeQuery = async (query, params = []) => {
  const [rows] = await pool.execute(query, params);
  return rows;
};

module.exports = {
  pool,
  executeQuery
}; 