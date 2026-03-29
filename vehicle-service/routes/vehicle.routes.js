const router = require("express").Router();
const { createVehicle, getVehicles } = require("../controllers/vehicle.controller");

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get vehicles
 */
router.get("/", getVehicles);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Add vehicle
 */
router.post("/", createVehicle);

module.exports = router;