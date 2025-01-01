# Authentication System

## Project Overview

This project is a **Full-stack Authentication System** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a seamless and secure user authentication experience with modern features, enhanced security, and intuitive design.

---

## Features

- **User Management:**
  - Registration
  - Login
  - Logout
- **Secure Password Storage:** Utilizes **bcrypt** for secure password hashing.
- **Protected Routes:** Ensures restricted access to sensitive areas of the application.
- **Enhanced Security:** Incorporates **JWT (JSON Web Token)** for user authentication.
- **Forgot Password Functionality:** Allows users to reset their password via email using **Nodemailer** integration.

---

## Key Technologies

- **React:** Front-end framework for building the user interface.
- **Node.js & Express.js:** Back-end server for API development.
- **MongoDB:** Database for storing user data securely.
- **Bcrypt:** Secure password hashing library.
- **JWT (JSON Web Token):** Used for authentication and authorization.
- **Nodemailer:** Enables email-based password reset functionality.

---

## Benefits

- **Improved User Experience:** Provides seamless login and signup functionality.
- **Enhanced Security:** Ensures data protection with encrypted passwords and secure authentication.
- **User Trust:** Builds user confidence with a robust and reliable system.

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/LAHI-RU/Login_Signup_with_React.git
   cd Login_Signup_with_React
   ```

2. **Install Dependencies:**
   - For the server:
     ```bash
     cd server
     npm install
     ```
   - For the client:
     ```bash
     cd client
     npm install
     ```

3. **Environment Setup:**
   - Create an `.env` file in the `server` directory with the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     EMAIL_SERVICE=your_email_service_provider
     EMAIL_USER=your_email_address
     EMAIL_PASS=your_email_password
     ```

4. **Run the Application:**
   - Start the server:
     ```bash
     cd server
     npm start
     ```
   - Start the client:
     ```bash
     cd client
     npm start
     ```

5. **Access the Application:**
   - Navigate to `http://localhost:3000` in your web browser.

---

## Contributions

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

### Project Link

[Login and Signup with React - GitHub Repository](https://github.com/LAHI-RU/Login_Signup_with_React)

---

Made with ❤️ by [W G Lahiru Dhananjaya Bandara](https://github.com/LAHI-RU).
