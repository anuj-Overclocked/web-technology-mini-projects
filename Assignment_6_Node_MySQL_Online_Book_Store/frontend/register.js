const registerForm = document.querySelector('#register-form');
const registerMessage = document.querySelector('#register-form .form-message');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fullName = registerForm.fullName.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirmPassword.value;
    registerMessage.className = 'form-message';

    if (!fullName || !email || !password || !confirmPassword) {
      registerMessage.textContent = 'Please complete every field.';
      registerMessage.classList.add('error');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      registerMessage.textContent = 'Please enter a valid email address.';
      registerMessage.classList.add('error');
      return;
    }
    if (password.length < 8) {
      registerMessage.textContent = 'Password must be at least 8 characters long.';
      registerMessage.classList.add('error');
      return;
    }
    if (password !== confirmPassword) {
      registerMessage.textContent = 'Passwords do not match.';
      registerMessage.classList.add('error');
      return;
    }

    const button = registerForm.querySelector('button');
    button.disabled = true;
    button.textContent = 'Creating account...';
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName, email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed.');
      registerMessage.textContent = 'Account created. Redirecting to login...';
      registerMessage.classList.add('success');
      registerForm.reset();
      setTimeout(() => { window.location.href = 'login.html'; }, 900);
    } catch (error) {
      registerMessage.textContent = error.message || 'The server is unavailable. Please try again.';
      registerMessage.classList.add('error');
    } finally {
      button.disabled = false;
      button.innerHTML = 'Create account <span>→</span>';
    }
  });
}
