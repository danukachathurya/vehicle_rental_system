const router = require("express").Router();
const {
  addReview,
  getAllReviews,
  getReviewsByVehicle,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       200:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *             example:
 *               _id: 67f1234567890abc12345678
 *               vehicleId: VEH-001
 *               rating: 5
 *               comment: Very comfortable and well maintained.
 *   get:
 *     summary: Get all reviews
 *     responses:
 *       200:
 *         description: List of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewListResponse'
 *             example:
 *               message: Reviews fetched successfully
 *               count: 2
 *               data:
 *                 - _id: 67f1234567890abc12345678
 *                   vehicleId: VEH-001
 *                   rating: 5
 *                   comment: Very comfortable and well maintained.
 *                 - _id: 67f1234567890abc12345679
 *                   vehicleId: VEH-011
 *                   rating: 4
 *                   comment: Clean car and excellent condition.
 */
router.get("/", getAllReviews);
router.post("/", addReview);

/**
 * @swagger
 * /reviews/vehicle/{vehicleId}:
 *   get:
 *     summary: Get reviews by vehicle
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           example: VEH-001
 *     responses:
 *       200:
 *         description: List of reviews for the selected vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewListResponse'
 *             example:
 *               message: Reviews fetched successfully
 *               count: 2
 *               data:
 *                 - _id: 67f1234567890abc12345678
 *                   vehicleId: VEH-011
 *                   rating: 5
 *                   comment: Clean car and excellent condition.
 *                 - _id: 67f1234567890abc12345679
 *                   vehicleId: VEH-011
 *                   rating: 4
 *                   comment: Smooth drive and good fuel efficiency.
 */
router.get("/vehicle/:vehicleId", getReviewsByVehicle);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   put:
 *     summary: Update review
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           example: 67f1234567890abc12345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewUpdateInput'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *             example:
 *               _id: 67f1234567890abc12345678
 *               vehicleId: VEH-001
 *               rating: 3
 *               comment: Updated review comment.
 *       400:
 *         description: Invalid review ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Cast to ObjectId failed for value "invalid-id"
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Review not found
 */
router.put("/:reviewId", updateReview);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete review
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           example: 67f1234567890abc12345678
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *             example:
 *               message: Review deleted successfully
 *       400:
 *         description: Invalid review ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Cast to ObjectId failed for value "invalid-id"
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Review not found
 */
router.delete("/:reviewId", deleteReview);

module.exports = router;
