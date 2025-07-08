// CarID giả định cho VinFast Lux A2.0 (cần đồng bộ với backend)
const CAR_ID = 1;

window.addEventListener('DOMContentLoaded', function() {
  const orderBtn = document.getElementById('orderBtn');
  const orderModal = document.getElementById('orderModal');
  const closeOrderModal = document.getElementById('closeOrderModal');
  const orderForm = document.getElementById('orderForm');
  const orderError = document.getElementById('orderError');
  const orderSuccess = document.getElementById('orderSuccess');

  if (orderBtn) {
    orderBtn.onclick = function() {
      if (!window.apiService || !apiService.isLoggedIn()) {
        alert('Bạn cần đăng nhập để đặt xe!');
        window.location.href = 'index.html';
        return;
      }
      orderModal.style.display = 'flex';
      orderError.textContent = '';
      orderSuccess.textContent = '';
      orderForm.reset();
    };
  }

  if (closeOrderModal) {
    closeOrderModal.onclick = function() {
      orderModal.style.display = 'none';
    };
  }

  if (orderForm) {
    orderForm.onsubmit = async function(e) {
      e.preventDefault();
      orderError.textContent = '';
      orderSuccess.textContent = '';
      const data = {
        carId: CAR_ID,
        fullName: orderForm.fullName.value,
        phone: orderForm.phone.value,
        email: orderForm.email.value,
        bookingDate: orderForm.bookingDate.value,
        note: orderForm.note.value
      };
      try {
        const res = await apiService.bookTestDrive(data);
        if (res.success) {
          orderSuccess.textContent = 'Đặt xe thành công! Vui lòng chờ xác nhận.';
        }
      } catch (err) {
        orderError.textContent = err.message || 'Đặt xe thất bại!';
      }
    };
  }
}); 