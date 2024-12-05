const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  loginTime: { type: Date, required: true, default: Date.now },
  logoutTime: { type: Date },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String },
});

module.exports = mongoose.model("DriverLocationStatus", driverSchema);
