// models/VehicleType.js
const mongoose = require("mongoose");
const database = require('../config/db');
const VehicleTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// exports.findByName = async (name) => {
//   // Replace this with your actual query logic
//   return await database.query('SELECT id, name FROM vehicletypes WHERE name = ?', [name]);
// };

// Add a static method to find by name
VehicleTypeSchema.statics.findByName = function (name) {
  return this.findOne({ name });
};

module.exports = mongoose.model("VehicleType", VehicleTypeSchema);
