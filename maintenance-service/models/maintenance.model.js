const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  vehicleId: String,
  status: String,
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);