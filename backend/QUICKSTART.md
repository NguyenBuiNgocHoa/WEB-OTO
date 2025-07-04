# 🚀 Hướng dẫn nhanh - Backend OTO

## Bước 1: Cài đặt dependencies
```bash
npm install
```

## Bước 2: Cấu hình database
1. Sao chép file config.env:
```bash
cp config.env .env
```

2. Cập nhật thông tin database trong file `.env`:
```env
DB_SERVER=localhost
DB_DATABASE=OTO
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=1433
JWT_SECRET=your_secret_key_here
```

## Bước 3: Khởi động server
```bash
# Development mode (với nodemon)
npm run dev

# Hoặc Production mode
npm start
```

## Bước 4: Test API
```bash
npm test
```

## 📋 Kiểm tra nhanh

1. **Health Check**: http://localhost:3000/api/health
2. **API Info**: http://localhost:3000/

## 🔧 Troubleshooting

- **Lỗi kết nối DB**: Kiểm tra SQL Server và thông tin trong `.env`
- **Port đã sử dụng**: Đổi PORT trong `.env`
- **CORS lỗi**: Cập nhật CORS_ORIGIN trong `.env`

## 📚 API Endpoints chính

- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile` - Lấy thông tin (cần token)
- `PUT /api/users/profile` - Cập nhật thông tin (cần token)
- `PUT /api/users/change-password` - Đổi mật khẩu (cần token)

## 🎯 Token Format
```
Authorization: Bearer <your_jwt_token>
``` 