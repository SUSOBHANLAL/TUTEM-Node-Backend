// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   verificationToken: {
//     type: String,
//   },
// });

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // Adjust the type if you need a specific format
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // age: {
  //   type: Number,
  //   required: true,
  // },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String, // Consider using an ENUM if you have specific options
    required: true,
  },
  userRole: {
    type: String, // Consider using an ENUM if you have specific options
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  manualVerification: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
