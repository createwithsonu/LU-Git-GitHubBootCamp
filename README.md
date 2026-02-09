# Simple Signup & Signin Pages

A clean, responsive signup and signin system with client-side validation using HTML, CSS, and JavaScript.

## Features

- **Sign Up Page** with comprehensive form validation
- **Sign In Page** with authentication against stored users
- **Password strength indicator** with real-time feedback
- **Form validation** with helpful error messages
- **Responsive design** that works on all devices
- **Local storage** for user data persistence
- **Password visibility toggle** for better UX
- **Demo accounts** for quick testing

## How to Use

1. **Clone or download** the project files to your computer
2. **Open** `signup.html` in your web browser to create a new account
3. **Fill out** the signup form with your details
4. **Click** "Create Account" to register
5. **Navigate** to `signin.html` to log in with your credentials
6. **Use** the demo accounts for quick testing (see below)

## Demo Accounts

For testing purposes, the system automatically creates two demo accounts:

1. **Email:** `john@example.com`
   **Password:** `Password123`

2. **Email:** `jane@example.com`
   **Password:** `Password123`

## Password Requirements

When creating an account, passwords must meet the following criteria:
- At least 8 characters long
- Contains at least one uppercase letter
- Contains at least one lowercase letter
- Contains at least one number

## Features in Detail

### Sign Up Page
- Real-time password validation with visual feedback
- Password confirmation matching
- Email format validation
- Full name validation
- Success/error message display
- Automatic redirect to signin page after successful registration

### Sign In Page
- Email and password validation
- Authentication against stored user data
- Success message upon login
- Error handling for invalid credentials
- Password visibility toggle

### Storage
- User data is stored in browser's `localStorage`
- Data persists between browser sessions
- No backend required for demonstration

## Browser Compatibility

Works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- **HTML5** for page structure
- **CSS3** for styling and responsive design
- **Vanilla JavaScript** for functionality and validation
- **Font Awesome** for icons
- **LocalStorage API** for data persistence

## Future Improvements

Potential enhancements for a production version:
1. Add backend integration with a database
2. Implement password reset functionality
3. Add email verification
4. Include social media login options
5. Add "Remember me" checkbox
6. Implement session management
7. Add CAPTCHA for security
8. Include terms and conditions acceptance

## Notes

- This is a **frontend-only** implementation for demonstration purposes
- User data is stored in the browser's local storage (not secure for production)
- In a real application, you would need a backend server and database
- Passwords are stored in plain text (for demo only - never do this in production)

## License

This project is provided for educational purposes. Feel free to use and modify as needed.

## Support

For questions or issues, please check the code comments or create an issue in the repository.

---

**Created with HTML, CSS, and JavaScript**