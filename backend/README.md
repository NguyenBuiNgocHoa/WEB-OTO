# Backend OTO Showroom

Backend Node.js cho hệ thống quản lý xe hơi OTO với các tính năng quản lý users.

## 🚀 Tính năng

- ✅ Đăng ký tài khoản
- ✅ Đăng nhập/Đăng xuất
- ✅ Quản lý thông tin cá nhân
- ✅ Đổi mật khẩu
- ✅ Xóa tài khoản
- ✅ Xác thực JWT
- ✅ Validation dữ liệu
- ✅ Bảo mật với bcrypt
- ✅ CORS support
- ✅ Error handling

## 📋 Yêu cầu hệ thống

- Node.js (v14 trở lên)
- SQL Server
- Database OTO (đã tạo sẵn)

## 🛠️ Cài đặt

### 1. Cài đặt dependencies

```bash
cd backend
npm install
```

### 2. Cấu hình môi trường

Sao chép file `config.env` và cập nhật thông tin:

```bash
cp config.env .env
```

Cập nhật các thông tin trong file `.env`:

```env
# Database
DB_SERVER=localhost
DB_DATABASE=OTO
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=1433

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=24h

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5500
```

### 3. Khởi động server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

## 📚 API Endpoints

### Authentication

#### Đăng ký
```
POST /api/users/register
Content-Type: application/json

{
  "fullName": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "password": "Password123",
  "address": "Hà Nội, Việt Nam"
}
```

#### Đăng nhập
```
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

### User Management (Cần xác thực)

#### Lấy thông tin profile
```
GET /api/users/profile
Authorization: Bearer <token>
```

#### Cập nhật thông tin
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Nguyễn Văn B",
  "phone": "0987654321",
  "address": "TP.HCM, Việt Nam"
}
```

#### Đổi mật khẩu
```
PUT /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

#### Xóa tài khoản
```
DELETE /api/users/account
Authorization: Bearer <token>
```

### Health Check

#### Kiểm tra sức khỏe server
```
GET /api/health
```

## 🔐 Bảo mật

- Mật khẩu được mã hóa bằng bcrypt
- JWT token cho xác thực
- Validation dữ liệu đầu vào
- Helmet middleware bảo mật
- CORS configuration

## 📁 Cấu trúc thư mục

```
backend/
├── config/
│   └── database.js          # Cấu hình database
├── controllers/
│   └── userController.js    # Logic xử lý user
├── middleware/
│   ├── auth.js             # Middleware xác thực
│   ├── validation.js       # Middleware validation
│   └── errorHandler.js     # Middleware xử lý lỗi
├── routes/
│   └── userRoutes.js       # Routes cho user
├── config.env              # File cấu hình môi trường
├── package.json            # Dependencies
├── server.js               # File khởi động server
└── README.md               # Hướng dẫn sử dụng
```

## 🐛 Troubleshooting

### Lỗi kết nối database
- Kiểm tra thông tin kết nối trong file `.env`
- Đảm bảo SQL Server đang chạy
- Kiểm tra firewall và port

### Lỗi JWT
- Kiểm tra JWT_SECRET trong file `.env`
- Đảm bảo token được gửi đúng format: `Bearer <token>`

### Lỗi CORS
- Cập nhật CORS_ORIGIN trong file `.env`
- Kiểm tra origin của frontend

## 📝 Ghi chú

- Tất cả response đều có format: `{ success: boolean, message: string, data?: any }`
- Error response: `{ success: false, message: string, errors?: array }`
- Token JWT có thời hạn 24h mặc định
- Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số

## 🔄 Phát triển tiếp

Các tính năng có thể phát triển thêm:
- Quản lý xe hơi (CRUD)
- Đặt lịch lái thử
- So sánh xe
- Chat support
- Đánh giá xe
- Blockchain records 