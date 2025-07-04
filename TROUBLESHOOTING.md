# 🔧 Hướng dẫn khắc phục lỗi và chạy hệ thống OTO

## ❌ Lỗi kết nối database

### Nguyên nhân:
- SQL Server chưa được cài đặt hoặc chưa chạy
- Thông tin kết nối database không đúng
- Firewall chặn kết nối

### Cách khắc phục:

#### 1. Kiểm tra SQL Server
```bash
# Windows
# Mở SQL Server Configuration Manager
# Kiểm tra SQL Server (MSSQLSERVER) đang chạy

# macOS/Linux
# Cài đặt SQL Server nếu chưa có
```

#### 2. Cấu hình database
1. Mở SQL Server Management Studio
2. Kết nối đến server
3. Tạo database OTO (nếu chưa có)
4. Chạy script tạo bảng (đã cung cấp)

#### 3. Cập nhật thông tin kết nối
```bash
cd backend
cp config.env .env
```

Cập nhật file `.env`:
```env
DB_SERVER=localhost
DB_DATABASE=OTO
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=1433
JWT_SECRET=your_secret_key_here
```

#### 4. Test kết nối
```bash
cd backend
npm test
```

## 🚀 Chạy toàn bộ hệ thống

### Bước 1: Khởi động Backend
```bash
cd backend
npm install
npm run dev
```

### Bước 2: Khởi động Frontend
```bash
# Sử dụng Live Server extension trong VS Code
# Hoặc sử dụng Python server
cd frontend
python -m http.server 5500
```

### Bước 3: Truy cập ứng dụng
- Frontend: http://localhost:5500
- Backend API: http://localhost:3000

## 📋 Kiểm tra hệ thống

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

### 2. Test API
```bash
cd backend
npm test
```

### 3. Test Frontend
- Mở http://localhost:5500
- Thử đăng ký tài khoản mới
- Thử đăng nhập
- Kiểm tra chức năng đăng xuất

## 🔍 Debug

### Backend logs
```bash
cd backend
npm run dev
# Xem logs trong terminal
```

### Frontend console
- Mở Developer Tools (F12)
- Xem tab Console để kiểm tra lỗi

### Database logs
- Kiểm tra SQL Server logs
- Test kết nối trực tiếp

## 🛠️ Cấu hình thay thế

### Nếu không có SQL Server
Có thể sử dụng SQLite hoặc MongoDB:

#### SQLite
```bash
npm install sqlite3
```

#### MongoDB
```bash
npm install mongodb
```

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra logs
2. Xem file README.md trong backend
3. Kiểm tra cấu hình database
4. Đảm bảo tất cả dependencies đã cài đặt 