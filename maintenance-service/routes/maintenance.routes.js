const router = require("express").Router();
const {
  addMaintenance,
  getMaintenance,
} = require("../controllers/maintenance.controller");

/**
 * @swagger
 * /maintenance:
 *   post:
 *     summary: Add maintenance record
 */
router.post("/", addMaintenance);

/**
 * @swagger
 * /maintenance/{vehicleId}:
 *   get:
 *     summary: Get maintenance history
 */
router.get("/:vehicleId", getMaintenance);

module.exports = router;