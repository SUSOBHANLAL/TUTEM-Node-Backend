// controllers/vehicleTypeController.js
const VehicleType = require("../models/VehicleType");

exports.createVehicleType = async (req, res) => {
  try {
    const vehicleType = await VehicleType.create(req.body);
    res.status(201).json(vehicleType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVehicleByName = async (req, res) => {
  const { name, id } = req.params; // Extract name and id from params
  try {
    let vehicleType;
    // If name is provided, search by name
    if (name) {
      vehicleType = await VehicleType.findByName(name);
    }
    // If no vehicle found by name or name is not provided, try to find by ID
    if (!vehicleType && id) {
      vehicleType = await VehicleType.findById(id);
    }
    // Check if a vehicle type is found
    if (vehicleType) {
      res.status(200).json(vehicleType);
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

exports.getVehicleById = async (req, res) => {
  const { name, id } = req.params; // Extract name and id from request params

  try {
    let vehicleType;

    // If name is provided, search by name
    if (name) {
      vehicleType = await VehicleType.findOne({ name: name }); // Use `findOne` to search by name
    }

    // If no vehicle found by name or name is not provided, try to find by ID
    if (!vehicleType && id) {
      vehicleType = await VehicleType.findById(id); // Use `findById` for ID-based search
    }

    // Check if a vehicle type is found
    if (vehicleType) {
      return res.status(200).json(vehicleType); // Send found vehicle data
    } else {
      return res.status(404).json({ error: "Vehicle not found" }); // Not found response
    }
  } catch (err) {
    // Catch any errors and respond with internal server error
    return res.status(500).json({
      error: "Internal server error",
      details: err.message, // Remove this line in production if exposing error details is unsafe
    });
  }
};

exports.getVehicleById = async (req, res) => {
  const { id } = req.params; // Extract id from request params

  try {
    // Search for the vehicle by ID
    const vehicleType = await VehicleType.findById(id);

    // Check if a vehicle type is found
    if (vehicleType) {
      return res.status(200).json(vehicleType); // Send found vehicle data
    } else {
      return res.status(404).json({ error: "Vehicle not found" }); // Not found response
    }
  } catch (err) {
    // Catch any errors and respond with internal server error
    return res.status(500).json({
      error: "Internal server error",
      details: err.message, // Optional: Remove in production to avoid exposing sensitive error details
    });
  }
};
