const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendEmail");
const { sendResetEmail } = require("../utils/sendResetEmail");

// Register User
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    phone,
    address,
    dateOfBirth,
    gender,
    userRole,
  } = req.body;

  try {
    console.log('INSIDE CONTROLLER', req.body);
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with hashed password and additional fields
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
      address,
      dateOfBirth,
      gender,
      userRole,
      createdAt: new Date(),
    });

    await user.save();

    // Generate verification token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.verificationToken = token; // Assign token to user
    await user.save(); // Save user with the token

    // Send verification email
    sendEmail(user.email, token);

    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// // Login User
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     if (!user.isVerified) {
//       return res.status(400).json({ message: "Email not verified" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Validate user existence and password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user has verified their email
    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Exclude sensitive information (like password) from the response
    const { password: _, verificationToken, ...userInfo } = user.toObject();

    // Send the token and user details in the response
    res.json({ 
      message: "Login successful", 
      token, 
      user: userInfo 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.verificationToken = token;
    await user.save();

    sendResetEmail(user.email, token); // Send password reset email
    res.json({ message: "Reset password email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Decode and verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Reset password
    user.password = await bcrypt.hash(password, 10);
    user.verificationToken = undefined; // Remove the token after resetting
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error in password reset:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.updateManualVerification = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Ensure both userId and email are provided  if you want  to  verify both like email and user now i  wnat  to  proceed with email only
    // if (!userId || !email) {
    //   return res.status(400).json({ message: "UserId and Email are required" });
    // }
    if (!email) {
      return res.status(400).json({ message: "UserId and Email are required" });
    }
    // Find the user by userId and email
    // const user = await User.findOne({ _id: userId, email: email });
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the manualVerification field to true
    user.manualVerification = true;
    await user.save();

    res
      .status(200)
      .json({ message: "User manual verification updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// // Generate OTP and send via SMS
// app.post("/send-otp", async (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

//   const expiration = new Date();
//   expiration.setMinutes(expiration.getMinutes() + 10); // OTP valid for 10 minutes

//   await User.findOneAndUpdate(
//     { phoneNumber },
//     { otp, otpExpiration: expiration },
//     { upsert: true }
//   );

//   await twilioClient.messages.create({
//     body: `Your OTP is ${otp}`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phoneNumber,
//   });

//   res.json({ message: "OTP sent successfully!" });
// });

// // Verify OTP
// app.post("/verify-otp", async (req, res) => {
//   const { phoneNumber, otp } = req.body;

//   const user = await User.findOne({ phoneNumber });

//   if (!user) {
//     return res.status(400).json({ message: "User not found!" });
//   }

//   if (user.otp !== otp) {
//     return res.status(400).json({ message: "Invalid OTP!" });
//   }

//   if (user.otpExpiration < new Date()) {
//     return res.status(400).json({ message: "OTP has expired!" });
//   }

//   // OTP is valid; you can proceed with further actions (e.g., user login)
//   res.json({ message: "OTP verified successfully!" });
// });
