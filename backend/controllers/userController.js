const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/database');

// Đăng ký user mới
const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, address } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const checkEmailQuery = 'SELECT CustomerID FROM Customers WHERE Email = ?';
    const emailCheck = await executeQuery(checkEmailQuery, [email]);
    
    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Thêm user mới vào database
    const insertQuery = `
      INSERT INTO Customers (FullName, Email, Phone, Address, PasswordHash)
      VALUES (?, ?, ?, ?, ?)
    `;
    await executeQuery(insertQuery, [
      fullName, email, phone, address || null, passwordHash
    ]);

    // Lấy user vừa tạo
    const getUserQuery = 'SELECT CustomerID, FullName, Email, Phone, Address, CreatedAt FROM Customers WHERE Email = ?';
    const users = await executeQuery(getUserQuery, [email]);
    const newUser = users[0];

    // Tạo JWT token
    const token = jwt.sign(
      { userId: newUser.CustomerID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: {
          id: newUser.CustomerID,
          fullName: newUser.FullName,
          email: newUser.Email,
          phone: newUser.Phone,
          address: newUser.Address,
          createdAt: newUser.CreatedAt
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Lỗi đăng ký:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

// Đăng nhập user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const query = 'SELECT CustomerID, FullName, Email, Phone, Address, PasswordHash FROM Customers WHERE Email = ?';
    const users = await executeQuery(query, [email]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    const user = users[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user.CustomerID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          id: user.CustomerID,
          fullName: user.FullName,
          email: user.Email,
          phone: user.Phone,
          address: user.Address
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Lỗi đăng nhập:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

// Lấy thông tin user hiện tại
const getProfile = async (req, res) => {
  try {
    const userId = req.user.CustomerID;

    const query = 'SELECT CustomerID, FullName, Email, Phone, Address, CreatedAt FROM Customers WHERE CustomerID = ?';
    const users = await executeQuery(query, [userId]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    const user = users[0];

    res.json({
      success: true,
      data: {
        id: user.CustomerID,
        fullName: user.FullName,
        email: user.Email,
        phone: user.Phone,
        address: user.Address,
        createdAt: user.CreatedAt
      }
    });

  } catch (error) {
    console.error('❌ Lỗi lấy thông tin profile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

// Cập nhật thông tin user
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.CustomerID;
    const { fullName, phone, address } = req.body;

    // Cập nhật thông tin user
    const updateQuery = `
      UPDATE Customers 
      SET FullName = ?, Phone = ?, Address = ?
      WHERE CustomerID = ?
    `;
    await executeQuery(updateQuery, [
      fullName, phone, address, userId
    ]);

    // Lấy lại thông tin user
    const getUserQuery = 'SELECT CustomerID, FullName, Email, Phone, Address, CreatedAt FROM Customers WHERE CustomerID = ?';
    const users = await executeQuery(getUserQuery, [userId]);
    const updatedUser = users[0];

    res.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      data: {
        id: updatedUser.CustomerID,
        fullName: updatedUser.FullName,
        email: updatedUser.Email,
        phone: updatedUser.Phone,
        address: updatedUser.Address,
        createdAt: updatedUser.CreatedAt
      }
    });

  } catch (error) {
    console.error('❌ Lỗi cập nhật profile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

// Đổi mật khẩu
const changePassword = async (req, res) => {
  try {
    const userId = req.user.CustomerID;
    const { currentPassword, newPassword } = req.body;

    // Lấy mật khẩu hiện tại
    const getPasswordQuery = 'SELECT PasswordHash FROM Customers WHERE CustomerID = ?';
    const users = await executeQuery(getPasswordQuery, [userId]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    const user = users[0];

    // Kiểm tra mật khẩu hiện tại
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.PasswordHash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      });
    }

    // Mã hóa mật khẩu mới
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Cập nhật mật khẩu mới
    const updatePasswordQuery = 'UPDATE Customers SET PasswordHash = ? WHERE CustomerID = ?';
    await executeQuery(updatePasswordQuery, [newPasswordHash, userId]);

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });

  } catch (error) {
    console.error('❌ Lỗi đổi mật khẩu:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

// Xóa tài khoản
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.CustomerID;

    // Xóa user
    const deleteQuery = 'DELETE FROM Customers WHERE CustomerID = ?';
    const result = await executeQuery(deleteQuery, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    res.json({
      success: true,
      message: 'Xóa tài khoản thành công'
    });

  } catch (error) {
    console.error('❌ Lỗi xóa tài khoản:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
}; 