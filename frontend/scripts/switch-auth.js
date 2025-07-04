document.addEventListener('DOMContentLoaded', function() {
  var btnShowRegister = document.getElementById('showRegister');
  var btnShowLogin = document.getElementById('showLogin');
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');

  if (btnShowRegister && loginForm && registerForm) {
    btnShowRegister.onclick = function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    };
  }
  if (btnShowLogin && loginForm && registerForm) {
    btnShowLogin.onclick = function(e) {
      e.preventDefault();
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    };
  }
}); 