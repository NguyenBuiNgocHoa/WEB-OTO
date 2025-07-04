// Cấu hình API
const API_BASE_URL = 'http://localhost:3000/api';

// Class quản lý API calls
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Cập nhật token
  updateToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Tạo headers cho request
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Xử lý response
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Có lỗi xảy ra');
    }
    
    return data;
  }

  // Đăng ký user
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/users/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData)
      });
      
      const data = await this.handleResponse(response);
      
      // Lưu token nếu đăng ký thành công
      if (data.data && data.data.token) {
        this.updateToken(data.data.token);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Lỗi đăng ký:', error.message);
      throw error;
    }
  }

  // Đăng nhập
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/users/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(credentials)
      });
      
      const data = await this.handleResponse(response);
      
      // Lưu token nếu đăng nhập thành công
      if (data.data && data.data.token) {
        this.updateToken(data.data.token);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Lỗi đăng nhập:', error.message);
      throw error;
    }
  }

  // Lấy thông tin profile
  async getProfile() {
    try {
      const response = await fetch(`${this.baseURL}/users/profile`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Lỗi lấy profile:', error.message);
      throw error;
    }
  }

  // Cập nhật profile
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}/users/profile`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(profileData)
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Lỗi cập nhật profile:', error.message);
      throw error;
    }
  }

  // Đổi mật khẩu
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${this.baseURL}/users/change-password`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(passwordData)
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Lỗi đổi mật khẩu:', error.message);
      throw error;
    }
  }

  // Đăng xuất
  logout() {
    this.updateToken(null);
    window.location.href = 'index.html';
  }

  // Kiểm tra trạng thái đăng nhập
  isLoggedIn() {
    return !!this.token;
  }

  // Lấy thông tin user từ token (nếu có)
  getCurrentUser() {
    if (!this.token) return null;
    
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('❌ Lỗi parse token:', error.message);
      return null;
    }
  }

  // Đặt xe (book test drive)
  async bookTestDrive(carId, bookingDate) {
    try {
      const response = await fetch(`${this.baseURL}/bookings`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ carId, bookingDate })
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Lỗi đặt xe:', error.message);
      throw error;
    }
  }
}

// Khởi tạo API service
const apiService = new ApiService();

// Export để sử dụng trong các file khác
window.apiService = apiService; 