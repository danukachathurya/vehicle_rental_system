const mongoose = require("mongoose");
const { randomBytes } = require("crypto");

function createId(prefix) {
  return `${prefix}-${Date.now()}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      default: () => createId("BKG"),
      unique: true,
      immutable: true,
    },
    userId: {
      type: String,
      trim: true,
      default: () => createId("USR"),
    },
    vehicleId: {
      type: String,
      trim: true,
      default: () => createId("VEH"),
    },
    vehicleBrand: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleModel: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleColor: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
