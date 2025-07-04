const axios = require('axios');

// Cấu hình base URL
const BASE_URL = 'http://localhost:3000/api';

// Test data
const testUser = {
  fullName: 'Nguyễn Văn Test',
  email: 'test@example.com',
  phone: '0123456789',
  password: 'Test123',
  address: 'Hà Nội, Việt Nam'
};

let authToken = '';

// Hàm test đăng ký
async function testRegister() {
  try {
    console.log('🧪 Testing đăng ký...');
    const response = await axios.post(`${BASE_URL}/users/register`, testUser);
    console.log('✅ Đăng ký thành công:', response.data.message);
    authToken = response.data.data.token;
    return true;
  } catch (error) {
    if (error.response?.data?.message === 'Email đã được sử dụng') {
      console.log('⚠️ Email đã tồn tại, thử đăng nhập...');
      return await testLogin();
    }
    console.log('❌ Lỗi đăng ký:', error.response?.data?.message || error.message);
    return false;
  }
}

// Hàm test đăng nhập
async function testLogin() {
  try {
    console.log('🧪 Testing đăng nhập...');
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Đăng nhập thành công:', response.data.message);
    authToken = response.data.data.token;
    return true;
  } catch (error) {
    console.log('❌ Lỗi đăng nhập:', error.response?.data?.message || error.message);
    return false;
  }
}

// Hàm test lấy profile
async function testGetProfile() {
  try {
    console.log('🧪 Testing lấy profile...');
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Lấy profile thành công:', response.data.data);
    return true;
  } catch (error) {
    console.log('❌ Lỗi lấy profile:', error.response?.data?.message || error.message);
    return false;
  }
}

// Hàm test cập nhật profile
async function testUpdateProfile() {
  try {
    console.log('🧪 Testing cập nhật profile...');
    const updateData = {
      fullName: 'Nguyễn Văn Test Updated',
      phone: '0987654321',
      address: 'TP.HCM, Việt Nam'
    };
    const response = await axios.put(`${BASE_URL}/users/profile`, updateData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Cập nhật profile thành công:', response.data.message);
    return true;
  } catch (error) {
    console.log('❌ Lỗi cập nhật profile:', error.response?.data?.message || error.message);
    return false;
  }
}

// Hàm test đổi mật khẩu
async function testChangePassword() {
  try {
    console.log('🧪 Testing đổi mật khẩu...');
    const passwordData = {
      currentPassword: testUser.password,
      newPassword: 'NewTest123',
      confirmPassword: 'NewTest123'
    };
    const response = await axios.put(`${BASE_URL}/users/change-password`, passwordData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Đổi mật khẩu thành công:', response.data.message);
    
    // Cập nhật password trong test data
    testUser.password = 'NewTest123';
    return true;
  } catch (error) {
    console.log('❌ Lỗi đổi mật khẩu:', error.response?.data?.message || error.message);
    return false;
  }
}

// Hàm test health check
async function testHealthCheck() {
  try {
    console.log('🧪 Testing health check...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check thành công:', response.data.message);
    return true;
  } catch (error) {
    console.log('❌ Lỗi health check:', error.response?.data?.message || error.message);
    return false;
  }
}

// Hàm chạy tất cả tests
async function runAllTests() {
  console.log('🚀 Bắt đầu test API...\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Register/Login', fn: testRegister },
    { name: 'Get Profile', fn: testGetProfile },
    { name: 'Update Profile', fn: testUpdateProfile },
    { name: 'Change Password', fn: testChangePassword }
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    console.log(`\n--- ${test.name} ---`);
    const result = await test.fn();
    if (result) passed++;
    console.log('---\n');
  }

  console.log(`📊 Kết quả: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 Tất cả tests đều thành công!');
  } else {
    console.log('⚠️ Một số tests thất bại, kiểm tra lại server và database.');
  }
}

// Chạy tests nếu file được thực thi trực tiếp
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testRegister,
  testLogin,
  testGetProfile,
  testUpdateProfile,
  testChangePassword,
  testHealthCheck,
  runAllTests
}; 