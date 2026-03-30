const router = require("express").Router();
const {
  createVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} = require("../controllers/vehicle.controller");

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Server error
 */
router.get("/", getVehicles);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Add vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleCreateInput'
 *           example:
 *             name: Toyota Corolla
 *             type: Sedan
 *             price: 15000
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/VehicleCreateInput'
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Validation error
 */
router.post("/", createVehicle);

/**
 * @swagger
 * /vehicles/{vehicleId}:
 *   put:
 *     summary: Update vehicle
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           example: ABC-001
 *         description: Generated vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleUpdate'
 *           example:
 *             name: Toyota Corolla Altis
 *             type: Sedan
 *             price: 16500
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/VehicleUpdate'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *             example:
 *               name: Toyota Corolla Altis
 *               type: Sedan
 *               price: 16500
 *               vehicleId: ABC-001
 *               _id: 67e7aed6b812a1cd93bcd123
 *               __v: 0
 *       400:
 *         description: Invalid vehicle ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Invalid vehicle ID
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Vehicle not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Server error
 *   delete:
 *     summary: Delete vehicle
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           example: ABC-001
 *         description: Generated vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       400:
 *         description: Invalid vehicle ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Invalid vehicle ID
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Vehicle not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Server error
 */
router.put("/:vehicleId", updateVehicle);
router.delete("/:vehicleId", deleteVehicle);

module.exports = router;
