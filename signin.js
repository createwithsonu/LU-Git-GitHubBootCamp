document.addEventListener('DOMContentLoaded', function() {
    // Get form and input elements
    const signinForm = document.getElementById('signinForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const messageDiv = document.getElementById('message');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset message
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const userEmail = email.value.trim();
        const userPassword = password.value;
        
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === userEmail && u.password === userPassword);
        
        if (!user) {
            showMessage('Invalid email or password. Please try again.', 'error');
            // Clear password field
            password.value = '';
            password.focus();
            return;
        }
        
        // Store current user in session (for demo purposes, using localStorage)
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            fullName: user.fullName,
            loggedInAt: new Date().toISOString()
        }));
        
        // Show success message
        showMessage(`Welcome back, ${user.fullName}! Redirecting to dashboard...`, 'success');
        
        // Reset form
        signinForm.reset();
        
        // Redirect to dashboard (or home page) after 2 seconds
        setTimeout(() => {
            // For demo purposes, redirect to a dummy dashboard
            // In a real app, you would redirect to an actual dashboard page
            alert('Successfully signed in! In a real app, you would be redirected to a dashboard.');
            // window.location.href = 'dashboard.html';
        }, 2000);
    });
    
    // Validate form
    function validateForm() {
        // Check email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showMessage('Please enter a valid email address.', 'error');
            email.focus();
            return false;
        }
        
        // Check password
        if (password.value.length === 0) {
            showMessage('Please enter your password.', 'error');
            password.focus();
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
    
    // Demo accounts for testing (if no users exist yet)
    // This is just for demonstration purposes
    function initializeDemoAccounts() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Only create demo accounts if no users exist
        if (users.length === 0) {
            const demoUsers = [
                {
                    fullName: 'John Doe',
                    email: 'john@example.com',
                    password: 'Password123',
                    createdAt: new Date().toISOString()
                },
                {
                    fullName: 'Jane Smith',
                    email: 'jane@example.com',
                    password: 'Password123',
                    createdAt: new Date().toISOString()
                }
            ];
            
            localStorage.setItem('users', JSON.stringify(demoUsers));
            console.log('Demo accounts created. You can sign in with:');
            console.log('Email: john@example.com, Password: Password123');
            console.log('Email: jane@example.com, Password: Password123');
        }
    }
    
    // Initialize demo accounts on page load
    initializeDemoAccounts();
});