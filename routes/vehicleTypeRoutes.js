// routes/vehicleTypeRoutes.js

console.log("Vehicle routes loaded");

const express = require("express");
const { createVehicleType } = require("../controllers/vehicleTypeController");

const vehicleTypeController = require("../controllers/vehicleTypeController");
const router = express.Router();

router.post("/", createVehicleType);

router.get("/:name/:id", vehicleTypeController.getVehicleByName);
// router.get("/:id", vehicleTypeController.getVehicleById);
router.get("/:id", vehicleTypeController.getVehicleById);

module.exports = router;
