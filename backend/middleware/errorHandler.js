// Middleware xử lý lỗi 404
const notFound = (req, res, next) => {
  const error = new Error(`Không tìm thấy - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware xử lý lỗi chung
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Xử lý lỗi SQL Server
  if (err.name === 'RequestError') {
    statusCode = 400;
    message = 'Lỗi dữ liệu';
  }

  // Xử lý lỗi validation
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Dữ liệu không hợp lệ';
  }

  // Xử lý lỗi JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token không hợp lệ';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token đã hết hạn';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  notFound,
  errorHandler
}; 