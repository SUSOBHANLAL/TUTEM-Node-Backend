// models/DriverStatus.js
const mongoose = require("mongoose");

const DriverStatusSchema = new mongoose.Schema({
  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "VehicleType",
    ref: "User",
    required: true,
  },
  description: { type: String },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
});

module.exports = mongoose.model("DriverStatus", DriverStatusSchema);
