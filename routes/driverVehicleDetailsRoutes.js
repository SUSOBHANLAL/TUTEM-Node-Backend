// routes/driverVehicleDetailsRoutes.js
const express = require("express");
const {
  createDriverVehicleDetails,
} = require("../controllers/driverVehicleDetailsController");

const router = express.Router();

router.post("/", createDriverVehicleDetails);

module.exports = router;
