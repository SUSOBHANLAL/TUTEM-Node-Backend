// routes/driverStatusRoutes.js
const express = require("express");
const { createDriverStatus } = require("../controllers/driverStatusController");

const router = express.Router();

router.post("/", createDriverStatus);

module.exports = router;
