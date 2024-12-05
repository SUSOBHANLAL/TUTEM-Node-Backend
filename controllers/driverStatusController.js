// controllers/driverStatusController.js
const DriverStatus = require("../models/DriverStatus");

exports.createDriverStatus = async (req, res) => {
  try {
    const status = await DriverStatus.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocation = async (data) => {
  const { driverID, longitude, latitude } = data;
  await DriverStatus.findOneAndUpdate(
    { driverID: driverID },
    { longitude, latitude, status: "active" },
    { new: true }
  );
};
