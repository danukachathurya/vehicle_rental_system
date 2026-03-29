const Maintenance = require("../models/maintenance.model");

exports.addMaintenance = async (req, res) => {
  try {
    const record = await Maintenance.create(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMaintenance = async (req, res) => {
  try {
    const records = await Maintenance.find({
      vehicleId: req.params.vehicleId,
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};