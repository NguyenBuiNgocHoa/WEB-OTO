const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword
} = require('../middleware/validation');

// Route đăng ký user mới
router.post('/register', validateRegister, userController.register);

// Route đăng nhập
router.post('/login', validateLogin, userController.login);

// Route lấy thông tin profile (cần xác thực)
router.get('/profile', authenticateToken, userController.getProfile);

// Route cập nhật thông tin profile (cần xác thực)
router.put('/profile', authenticateToken, validateUpdateProfile, userController.updateProfile);

// Route đổi mật khẩu (cần xác thực)
router.put('/change-password', authenticateToken, validateChangePassword, userController.changePassword);

// Route xóa tài khoản (cần xác thực)
router.delete('/account', authenticateToken, userController.deleteAccount);

module.exports = router; 