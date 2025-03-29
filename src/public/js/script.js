const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.replace('bx-low-vision', 'bx-show');
    } else {
        passwordInput.type = 'password';
        togglePassword.classList.replace('bx-show', 'bx-low-vision');
    }
});