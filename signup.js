document.addEventListener('DOMContentLoaded', function() {
    // Get form and input elements
    const signupForm = document.getElementById('signupForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const messageDiv = document.getElementById('message');
    
    // Password requirement elements
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqLowercase = document.getElementById('req-lowercase');
    const reqNumber = document.getElementById('req-number');
    const passwordMatch = document.getElementById('passwordMatch');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Validate password in real-time
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validatePasswordMatch);
    
    // Validate password strength
    function validatePassword() {
        const pass = password.value;
        
        // Check length
        if (pass.length >= 8) {
            reqLength.classList.remove('requirement-not-met');
            reqLength.classList.add('requirement-met');
        } else {
            reqLength.classList.remove('requirement-met');
            reqLength.classList.add('requirement-not-met');
        }
        
        // Check uppercase
        if (/[A-Z]/.test(pass)) {
            reqUppercase.classList.remove('requirement-not-met');
            reqUppercase.classList.add('requirement-met');
        } else {
            reqUppercase.classList.remove('requirement-met');
            reqUppercase.classList.add('requirement-not-met');
        }
        
        // Check lowercase
        if (/[a-z]/.test(pass)) {
            reqLowercase.classList.remove('requirement-not-met');
            reqLowercase.classList.add('requirement-met');
        } else {
            reqLowercase.classList.remove('requirement-met');
            reqLowercase.classList.add('requirement-not-met');
        }
        
        // Check number
        if (/[0-9]/.test(pass)) {
            reqNumber.classList.remove('requirement-not-met');
            reqNumber.classList.add('requirement-met');
        } else {
            reqNumber.classList.remove('requirement-met');
            reqNumber.classList.add('requirement-not-met');
        }
        
        // Validate password match as well
        validatePasswordMatch();
    }
    
    // Validate password match
    function validatePasswordMatch() {
        const pass = password.value;
        const confirmPass = confirmPassword.value;
        
        if (confirmPass.length === 0) {
            passwordMatch.textContent = '';
            return;
        }
        
        if (pass === confirmPass) {
            passwordMatch.textContent = '✓ Passwords match';
            passwordMatch.style.color = '#28a745';
        } else {
            passwordMatch.textContent = '✗ Passwords do not match';
            passwordMatch.style.color = '#dc3545';
        }
    }
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset message
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const userData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            password: password.value,
            createdAt: new Date().toISOString()
        };
        
        // Check if user already exists in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === userData.email);
        
        if (existingUser) {
            showMessage('An account with this email already exists. Please sign in instead.', 'error');
            return;
        }
        
        // Add new user to localStorage
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        showMessage('Account created successfully! Redirecting to sign in page...', 'success');
        
        // Reset form
        signupForm.reset();
        resetPasswordRequirements();
        
        // Redirect to sign in page after 2 seconds
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 2000);
    });
    
    // Validate entire form
    function validateForm() {
        // Check full name
        if (fullName.value.trim().length < 2) {
            showMessage('Please enter a valid full name (at least 2 characters).', 'error');
            fullName.focus();
            return false;
        }
        
        // Check email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showMessage('Please enter a valid email address.', 'error');
            email.focus();
            return false;
        }
        
        // Check password
        const pass = password.value;
        if (pass.length < 8) {
            showMessage('Password must be at least 8 characters long.', 'error');
            password.focus();
            return false;
        }
        
        if (!/[A-Z]/.test(pass)) {
            showMessage('Password must contain at least one uppercase letter.', 'error');
            password.focus();
            return false;
        }
        
        if (!/[a-z]/.test(pass)) {
            showMessage('Password must contain at least one lowercase letter.', 'error');
            password.focus();
            return false;
        }
        
        if (!/[0-9]/.test(pass)) {
            showMessage('Password must contain at least one number.', 'error');
            password.focus();
            return false;
        }
        
        // Check password match
        if (password.value !== confirmPassword.value) {
            showMessage('Passwords do not match.', 'error');
            confirmPassword.focus();
            return false;
        }
        
        return true;
    }
    
    // Show message
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Reset password requirements display
    function resetPasswordRequirements() {
        const requirements = [reqLength, reqUppercase, reqLowercase, reqNumber];
        requirements.forEach(req => {
            req.classList.remove('requirement-met');
            req.classList.add('requirement-not-met');
        });
        passwordMatch.textContent = '';
    }
});