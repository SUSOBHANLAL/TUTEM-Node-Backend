// controllers/driverVehicleDetailsController.js
const DriverVehicleDetails = require("../models/DriverVehicleDetails");

exports.createDriverVehicleDetails = async (req, res) => {
  try {
    const details = await DriverVehicleDetails.create(req.body);
    res.status(201).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
