import express from "express";
import bcrypt from "bcrypt"; // Fixed typo: bcryt -> bcrypt
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ status: false, message: "User already exists" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.json({ status: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ status: false, message: "Password is incorrect" });
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    return res.json({ status: true, message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({ status: false, message: "Server error" });
  }
});

// FIXED: Changed createTransporter to createTransport
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  
  console.log('🔄 Password reset request for:', email); // Debug log
  
  try {
    // Validate email input
    if (!email) {
      return res.json({ status: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "User not registered" });
    }

    // Generate reset token
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "15m", // Changed from 5m to 15m for better UX
    });

    console.log('✅ Token generated for user:', user.email); // Debug log

    // Email configuration - FIXED: createTransport instead of createTransporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter before sending
    try {
      await transporter.verify();
      console.log('✅ Email transporter verified'); // Debug log
    } catch (verifyError) {
      console.error('❌ Email transporter verification failed:', verifyError);
      return res.json({ 
        status: false, 
        message: "Email service configuration error. Please contact support." 
      });
    }

    const resetLink = `http://localhost:5173/resetPassword/${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Send to user's email, not hardcoded
      subject: "Reset Your Password - MERN Auth App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0;">Password Reset Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #333; margin-top: 0;">Hello!</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              You requested to reset your password for your MERN Auth App account.
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: linear-gradient(135deg, #667eea, #764ba2); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold;
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Or copy and paste this link in your browser:
            </p>
            <p style="color: #667eea; font-size: 14px; word-break: break-all; background: #e8f0fe; padding: 10px; border-radius: 5px;">
              ${resetLink}
            </p>
            
            <div style="border-top: 1px solid #dee2e6; margin-top: 30px; padding-top: 20px;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                ⏰ This link will expire in 15 minutes for security reasons.
              </p>
              <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                🔒 If you didn't request this password reset, please ignore this email.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent:', info.messageId); // Debug log
    
    return res.json({ 
      status: true, 
      message: "Password reset link sent to your email!" 
    });
    
  } catch (err) {
    console.error('❌ Forgot password error:', err); // Debug log
    
    // Specific error handling
    if (err.message.includes('Invalid login')) {
      return res.json({ 
        status: false, 
        message: "Email configuration error. Please try again later." 
      });
    } else if (err.message.includes('ECONNREFUSED')) {
      return res.json({ 
        status: false, 
        message: "Email service unavailable. Please try again later." 
      });
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      return res.json({ 
        status: false, 
        message: "Network error. Please check your internet connection." 
      });
    } else {
      return res.json({ 
        status: false, 
        message: "Failed to send reset email. Please try again." 
      });
    }
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.json({ status: false, message: "Invalid or expired token" });
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "No token provided" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    req.user = decoded; // Add user info to request
    next();
  } catch (err) {
    return res.json({ status: false, message: "Invalid token" });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized", user: req.user });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logged out successfully" });
});

export { router as UserRouter };