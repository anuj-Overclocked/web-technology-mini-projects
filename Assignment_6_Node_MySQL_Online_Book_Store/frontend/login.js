const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-form .form-message');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    loginMessage.className = 'form-message';

    if (!email || !password) {
      loginMessage.textContent = 'Please enter both your email and password.';
      loginMessage.classList.add('error');
      return;
    }

    const button = loginForm.querySelector('button');
    button.disabled = true;
    button.textContent = 'Signing in...';
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login failed.');
      sessionStorage.setItem('bookhubUser', JSON.stringify(result.user));
      loginMessage.textContent = 'Login successful. Welcome back!';
      loginMessage.classList.add('success');
      loginForm.reset();
    } catch (error) {
      loginMessage.textContent = error.message || 'The server is unavailable. Please try again.';
      loginMessage.classList.add('error');
    } finally {
      button.disabled = false;
      button.innerHTML = 'Sign in <span>→</span>';
    }
  });
}
