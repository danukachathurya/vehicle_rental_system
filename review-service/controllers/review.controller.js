const Review = require("../models/review.model");

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByVehicle = async (req, res) => {
  try {
    const reviews = await Review.find({
      vehicleId: req.params.vehicleId,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};