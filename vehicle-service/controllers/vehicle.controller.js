const Vehicle = require("../models/vehicle.model");

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    res.json(await Vehicle.find());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    if (!req.params.vehicleId) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findOneAndUpdate(
      { vehicleId: req.params.vehicleId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    if (!req.params.vehicleId) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findOneAndDelete({ vehicleId: req.params.vehicleId });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
