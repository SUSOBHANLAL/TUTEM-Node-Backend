// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
// const validateDriverId = require('../middlewares/driver_middleware');

router.get("/location", driverController.getLocationPage);

module.exports = router;
