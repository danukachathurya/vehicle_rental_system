const Vehicle = require("../models/vehicle.model");

exports.createVehicle = async (req, res) => {
  res.json(await Vehicle.create(req.body));
};

exports.getVehicles = async (req, res) => {
  res.json(await Vehicle.find());
};