const router = require("express").Router();
const {
  addReview,
  getReviewsByVehicle,
} = require("../controllers/review.controller");

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add review
 */
router.post("/", addReview);

/**
 * @swagger
 * /reviews/{vehicleId}:
 *   get:
 *     summary: Get reviews by vehicle
 */
router.get("/:vehicleId", getReviewsByVehicle);

module.exports = router;