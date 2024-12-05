// models/DriverVehicleDetails.js
const mongoose = require("mongoose");

const DriverVehicleDetailsSchema = new mongoose.Schema({
  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleType",
    required: true,
  },
  license: { type: String, required: true },
  vehicleDtls: { type: String, required: true },
});

module.exports = mongoose.model(
  "DriverVehicleDetails",
  DriverVehicleDetailsSchema
);
