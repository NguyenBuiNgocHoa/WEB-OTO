const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });

// Import các module
const { connectDB } = require('./config/database');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Import routes
const userRoutes = require('./routes/userRoutes');

// Khởi tạo app
const app = express();

// Kết nối database
connectDB();

// Middleware bảo mật
app.use(helmet());

// Middleware CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5500',
  credentials: true
}));

// Middleware logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware parse JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/users', userRoutes);

// Route kiểm tra sức khỏe server
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server hoạt động bình thường',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Route mặc định
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Chào mừng đến với API OTO Showroom',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      health: '/api/health'
    }
  });
});

// Middleware xử lý lỗi 404
app.use(notFound);

// Middleware xử lý lỗi chung
app.use(errorHandler);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

// Xử lý tắt server gracefully
process.on('SIGTERM', () => {
  console.log('🛑 Nhận tín hiệu SIGTERM, đang tắt server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Nhận tín hiệu SIGINT, đang tắt server...');
  process.exit(0);
}); 