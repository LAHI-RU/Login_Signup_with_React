# 🔐 MERN Authentication System

A modern, full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js). This project provides a complete user authentication solution with secure password management, email verification, and a beautiful, responsive user interface.

## 🌟 Features

### 🔑 Authentication & Security
- **User Registration & Login** with email validation
- **JWT Token-based Authentication** with HTTP-only cookies
- **Password Reset via Email** with secure token generation
- **Password Hashing** using bcrypt with salt rounds
- **Protected Routes** with middleware authentication
- **Secure Logout** with token cleanup

### 🎨 Modern UI/UX
- **Responsive Design** that works on all devices
- **Glassmorphism Effects** with modern CSS gradients
- **Loading States** and smooth animations
- **Error Handling** with user-friendly messages
- **Professional Email Templates** for password reset

### 🛡️ Security Best Practices
- **HTTP-Only Cookies** for token storage
- **CORS Configuration** for cross-origin security
- **Input Validation** on both client and server
- **Error Sanitization** to prevent information leakage
- **Token Expiration** with automatic cleanup

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (v5 or higher)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-auth-system.git
   cd mern-auth-system
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   KEY=your_jwt_secret_key_here
   
   # Email Configuration (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://127.0.0.1:27017/authentication
   ```

   > **📧 Email Setup Guide:**
   > 1. Enable 2-Factor Authentication on your Gmail account
   > 2. Generate an App-Specific Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
   > 3. Use the generated password in `EMAIL_PASS`

5. **Start MongoDB**
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS (with Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

6. **Run the application**
   
   **Start the server (Terminal 1):**
   ```bash
   cd server
   npm start
   ```
   
   **Start the client (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## 📱 Application Screenshots

### Home Page
Beautiful landing page with authentication status detection and smooth navigation.

### Authentication Forms
Modern login and registration forms with real-time validation and error handling.

### Dashboard
Protected user dashboard with user information and secure logout functionality.

### Password Reset
Professional email-based password reset flow with secure token validation.

## 🏗️ Project Structure

```
mern-auth-system/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/         # React Components
│   │   │   ├── Dashboard.jsx   # Protected Dashboard
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx        # Landing Page
│   │   │   ├── Login.jsx       # Login Form
│   │   │   ├── ResetPassword.jsx
│   │   │   └── Signup.jsx      # Registration Form
│   │   ├── App.jsx            # Main App Component
│   │   ├── App.css            # Styling
│   │   └── main.jsx           # Entry Point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js Backend
│   ├── models/
│   │   └── User.js            # User Schema
│   ├── routes/
│   │   └── user.js            # Authentication Routes
│   ├── .env                   # Environment Variables
│   ├── index.js               # Server Entry Point
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/signup` | Register new user | ❌ |
| `POST` | `/login` | User login | ❌ |
| `POST` | `/forgot-password` | Request password reset | ❌ |
| `POST` | `/reset-password/:token` | Reset password with token | ❌ |
| `GET` | `/verify` | Verify JWT token | ✅ |
| `GET` | `/logout` | User logout | ✅ |

### Request/Response Examples

**User Registration:**
```bash
POST /auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**User Login:**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - Modern React with Hooks
- **Vite 5.3.2** - Fast build tool and development server
- **React Router DOM 6.23.1** - Client-side routing
- **Axios 1.7.2** - HTTP client for API requests
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.19.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.4.3** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcrypt 5.1.1** - Password hashing library
- **Nodemailer 6.9.14** - Email sending functionality
- **CORS** - Cross-Origin Resource Sharing

### Development Tools
- **Nodemon** - Development server auto-restart
- **ESLint** - Code linting and formatting
- **Vite** - Fast frontend build tool

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `KEY` | JWT secret key | `your_jwt_secret_key` |
| `EMAIL_USER` | Gmail address for sending emails | `app@gmail.com` |
| `EMAIL_PASS` | Gmail app-specific password | `abcd efgh ijkl mnop` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/auth` |

### Gmail App Password Setup

1. **Enable 2-Step Verification** on your Google Account
2. **Generate App Password:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated 16-character password
3. **Use the app password** in your `.env` file

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Build the project:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform

### Backend Deployment (Heroku/Railway)

1. **Add production environment variables**
2. **Update CORS origins** for production URLs
3. **Use MongoDB Atlas** for production database

### Production Environment Variables
```env
NODE_ENV=production
PORT=process.env.PORT
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://your-frontend-domain.com
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with incorrect credentials
- [ ] Password reset email is sent successfully
- [ ] Password reset token works correctly
- [ ] Protected routes require authentication
- [ ] Logout clears authentication state

### API Testing with Postman

Import the provided Postman collection for comprehensive API testing:

```bash
# Test user registration
POST http://localhost:3000/auth/signup

# Test user login
POST http://localhost:3000/auth/login

# Test token verification
GET http://localhost:3000/auth/verify
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m 'Add amazing feature'`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Add comments for complex logic
- Update documentation for new features
- Ensure all tests pass before submitting

## 🐛 Troubleshooting

### Common Issues

**1. Email not sending:**
```bash
# Check email configuration
curl -X GET http://localhost:3000/auth/test-email
```

**2. MongoDB connection issues:**
```bash
# Verify MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"
```

**3. CORS errors:**
- Ensure frontend URL is added to CORS origins
- Check that credentials are included in requests

**4. JWT token issues:**
- Verify JWT secret key in environment variables
- Check token expiration times

### Debug Mode

Enable debug logging by adding to your `.env`:
```env
DEBUG=true
NODE_ENV=development
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/docs) - For excellent React guidance
- [Express.js Guide](https://expressjs.com/en/guide) - For backend development patterns
- [MongoDB Documentation](https://docs.mongodb.com/) - For database best practices
- [JWT.io](https://jwt.io/) - For JWT implementation reference

## 📊 Project Stats

- **Lines of Code:** ~2,000+
- **Components:** 6 React components
- **API Endpoints:** 6 authentication routes
- **Security Features:** 8+ implemented
- **Browser Support:** All modern browsers

---

⭐ **Star this repository** if you found it helpful!

**Happy Coding!** 🚀
