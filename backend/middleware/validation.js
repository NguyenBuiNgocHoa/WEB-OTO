const { body, validationResult } = require('express-validator');

// Middleware xử lý lỗi validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors: errors.array()
    });
  }
  next();
};

// Validation cho đăng ký user
const validateRegister = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Họ tên phải từ 2-100 ký tự'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  
  body('phone')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Số điện thoại không hợp lệ'),
  
  body('password')
    .isLength({ min: 2 })
    .withMessage('Mật khẩu phải có ít nhất 2 ký tự'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Địa chỉ không được quá 500 ký tự'),
  
  handleValidationErrors
];

// Validation cho đăng nhập
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  
  body('password')
    .notEmpty()
    .withMessage('Mật khẩu không được để trống'),
  
  handleValidationErrors
];

// Validation cho cập nhật thông tin user
const validateUpdateProfile = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Họ tên phải từ 2-100 ký tự'),
  
  body('phone')
    .optional()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Số điện thoại không hợp lệ'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Địa chỉ không được quá 500 ký tự'),
  
  handleValidationErrors
];

// Validation cho đổi mật khẩu
const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Mật khẩu hiện tại không được để trống'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Mật khẩu mới phải chứa chữ hoa, chữ thường và số'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Mật khẩu xác nhận không khớp');
      }
      return true;
    }),
  
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  handleValidationErrors
}; 