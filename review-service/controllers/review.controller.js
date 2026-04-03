const Review = require("../models/review.model");

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(200).json({
      message: reviews.length
        ? "Reviews fetched successfully"
        : "No reviews available",
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByVehicle = async (req, res) => {
  try {
    const reviews = await Review.find({
      vehicleId: req.params.vehicleId,
    });
    return res.status(200).json({
      message: reviews.length
        ? "Reviews fetched successfully"
        : "No reviews found for this vehicle",
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.json(review);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.json({ message: "Review deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
