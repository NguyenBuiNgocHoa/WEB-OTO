# 🚗 OTO Showroom - Hệ thống quản lý xe hơi

Hệ thống web quản lý showroom xe hơi với frontend HTML/CSS/JavaScript và backend Node.js.

## 🎯 Tính năng chính

### ✅ Đã hoàn thành
- **Authentication System**: Đăng ký, đăng nhập, đăng xuất
- **User Management**: Quản lý thông tin cá nhân, đổi mật khẩu
- **Security**: JWT authentication, bcrypt password hashing
- **Responsive Design**: Giao diện đẹp, tương thích mobile
- **API Integration**: Frontend tích hợp với backend API

### 🔄 Đang phát triển
- Quản lý xe hơi (CRUD)
- Đặt lịch lái thử
- So sánh xe
- Chat support
- Đánh giá xe
- Blockchain records

## 🏗️ Cấu trúc project

```
WEB-OTO/
├── frontend/                 # Frontend (HTML/CSS/JS)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css    # CSS cho trang đăng nhập
│   │   │   └── trang_chinh.css # CSS cho trang chính
│   │   └── img/              # Hình ảnh xe
│   ├── scripts/
│   │   └── api.js           # API integration
│   ├── index.html           # Trang đăng nhập/đăng ký
│   ├── welcome.html         # Trang chính
│   └── VinFast_Lux SA2.0.html # Trang chi tiết xe
├── backend/                  # Backend (Node.js/Express)
│   ├── config/
│   │   └── database.js      # Cấu hình database
│   ├── controllers/
│   │   └── userController.js # Logic xử lý user
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication
│   │   ├── validation.js    # Input validation
│   │   └── errorHandler.js  # Error handling
│   ├── routes/
│   │   └── userRoutes.js    # User API routes
│   ├── server.js            # Main server file
│   ├── test-api.js          # API testing
│   └── package.json         # Dependencies
└── README.md                # Hướng dẫn tổng quan
```

## 🛠️ Công nghệ sử dụng

### Frontend
- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling và responsive design
- **JavaScript (ES6+)**: Logic và API integration
- **Fetch API**: Giao tiếp với backend

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **SQL Server**: Database
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (v14+)
- SQL Server
- Git

### Bước 1: Clone project
```bash
git clone <repository-url>
cd WEB-OTO
```

### Bước 2: Cài đặt Backend
```bash
cd backend
npm install
cp config.env .env
# Cập nhật thông tin database trong file .env
npm run dev
```

### Bước 3: Cài đặt Frontend
```bash
cd frontend
# Sử dụng Live Server hoặc Python server
python -m http.server 5500
```

### Bước 4: Truy cập ứng dụng
- Frontend: http://localhost:5500
- Backend API: http://localhost:3000

## 📚 API Documentation

### Authentication
- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập

### User Management
- `GET /api/users/profile` - Lấy thông tin (cần token)
- `PUT /api/users/profile` - Cập nhật thông tin (cần token)
- `PUT /api/users/change-password` - Đổi mật khẩu (cần token)
- `DELETE /api/users/account` - Xóa tài khoản (cần token)

### Health Check
- `GET /api/health` - Kiểm tra sức khỏe server

## 🔐 Bảo mật

- **JWT Authentication**: Token-based authentication
- **Password Hashing**: bcrypt với salt rounds 12
- **Input Validation**: Validation tất cả input
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **SQL Injection Protection**: Prepared statements

## 🎨 Giao diện

### Trang đăng nhập/đăng ký
- Form đăng nhập với email/password
- Form đăng ký với validation
- Chuyển đổi mượt mà giữa 2 form
- Responsive design

### Trang chính
- Hiển thị danh sách xe VinFast
- Thông tin user và nút đăng xuất
- Giao diện hiện đại với gradient background

## 🧪 Testing

### Test API
```bash
cd backend
npm test
```

### Test Frontend
- Mở Developer Tools (F12)
- Kiểm tra Console tab
- Test các chức năng đăng nhập/đăng ký

## 🔧 Troubleshooting

Xem file `TROUBLESHOOTING.md` để biết cách khắc phục các lỗi thường gặp.

## 📝 Ghi chú

- Tất cả comment trong code đều bằng tiếng Việt
- API responses có format chuẩn: `{ success: boolean, message: string, data?: any }`
- Token JWT có thời hạn 24h
- Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- Email: your.email@example.com
- Project Link: [https://github.com/yourusername/WEB-OTO](https://github.com/yourusername/WEB-OTO) 