const mongoose = require("mongoose");
const Booking = require("../models/booking.model");

function getErrorStatus(err) {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return 400;
  }

  return 500;
}

function sanitizeBookingPayload(payload) {
  const { _id, bookingId, createdAt, updatedAt, __v, ...safePayload } = payload;
  return safePayload;
}

function getBookingQuery(identifier) {
  const query = [{ bookingId: identifier }];

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    query.push({ _id: identifier });
  }

  return query.length === 1 ? query[0] : { $or: query };
}

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(sanitizeBookingPayload(req.body));
    res.status(201).json(booking);
  } catch (err) {
    res.status(getErrorStatus(err)).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      getBookingQuery(req.params.bookingId),
      sanitizeBookingPayload(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.json(booking);
  } catch (err) {
    return res.status(getErrorStatus(err)).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete(
      getBookingQuery(req.params.bookingId)
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    return res.status(getErrorStatus(err)).json({ error: err.message });
  }
};
