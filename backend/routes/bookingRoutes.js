const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { executeQuery } = require('../config/database');

// Đặt lịch lái thử xe
router.post('/', authenticateToken, async (req, res) => {
  const { carId, bookingDate } = req.body;
  const customerId = req.user.CustomerID;
  if (!carId || !bookingDate) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin xe hoặc ngày đặt.' });
  }
  try {
    await executeQuery(
      'INSERT INTO TestDriveBookings (CustomerID, CarID, BookingDate, Status) VALUES (?, ?, ?, ?)',
      [customerId, carId, bookingDate, 'Pending']
    );
    res.json({ success: true, message: 'Đặt xe thành công!' });
  } catch (err) {
    console.error('Lỗi đặt xe:', err);
    res.status(500).json({ success: false, message: 'Lỗi server khi đặt xe.' });
  }
});

module.exports = router; 