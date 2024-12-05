const { text } = require("express");
const nodemailer = require("nodemailer");

const sendResetEmail = (to, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Change this as needed
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Optional for local development
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification",
    text: `Click the link to verify your email: http://localhost:5000/api/auth/reset-password/${token}  Click the link to verify your email: click here if you are doing in frontend http://127.0.0.1:5500/reset-password.html?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

module.exports = { sendResetEmail };
