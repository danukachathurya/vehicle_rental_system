const Maintenance = require("../models/maintenance.model");

exports.getAllMaintenance = async (req, res) => {
  try {
    const records = await Maintenance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMaintenance = async (req, res) => {
  try {
    const record = await Maintenance.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

exports.updateMaintenance = async (req, res) => {
  try {
    if (!req.params.vehicleId) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const record = await Maintenance.findOneAndUpdate(
      { vehicleId: req.params.vehicleId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!record) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    return res.json(record);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteMaintenance = async (req, res) => {
  try {
    if (!req.params.vehicleId) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const record = await Maintenance.findOneAndDelete({
      vehicleId: req.params.vehicleId,
    });

    if (!record) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    return res.json({ message: "Maintenance record deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
