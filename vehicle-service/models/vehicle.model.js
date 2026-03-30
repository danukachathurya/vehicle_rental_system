const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const vehicleSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  type: String,
  price: Number,
});

const formatVehicleId = (seq) => {
  const padded = String(seq).padStart(3, "0");
  return `ABC-${padded}`;
};

vehicleSchema.pre("validate", async function () {
  if (this.vehicleId) return;

  const counter = await Counter.findOneAndUpdate(
    { name: "vehicle" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.vehicleId = formatVehicleId(counter.seq);
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
