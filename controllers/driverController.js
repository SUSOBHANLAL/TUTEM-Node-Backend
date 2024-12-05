// controllers/driverController.js
const Driver = require('../models/driver');

exports.updateLocation = async (data) => {
  try {
    const { driverId, latitude, longitude } = data;
    
    // Update driver location if exists, or create a new entry
    const driver = await Driver.findOneAndUpdate(
      { driverId },
      { latitude, longitude, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log('Driver location updated:', driver);
  } catch (error) {
    console.error('Error updating driver location:', error);
  }
};

exports.getLocationPage = (req, res) => {
  res.render('index');
};
