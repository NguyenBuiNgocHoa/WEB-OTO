const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/database');

// Middleware xác thực JWT
const authenticateToken = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token không được cung cấp'
      });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kiểm tra user có tồn tại trong database không
    const query = 'SELECT CustomerID, FullName, Email FROM Customers WHERE CustomerID = ?';
    const result = await executeQuery(query, [decoded.userId]);
    
    if (!result || result.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ'
      });
    }

    // Thêm thông tin user vào request
    req.user = result[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn'
      });
    } else {
      console.error('❌ Lỗi xác thực token:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server'
      });
    }
  }
};

// Middleware tùy chọn - không bắt buộc xác thực
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = 'SELECT CustomerID, FullName, Email FROM Customers WHERE CustomerID = ?';
      const result = await executeQuery(query, [decoded.userId]);
      
      if (result && result.length > 0) {
        req.user = result[0];
      }
    }
    next();
  } catch (error) {
    // Bỏ qua lỗi xác thực vì đây là middleware tùy chọn
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
}; 