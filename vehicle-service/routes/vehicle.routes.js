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
 *         description: List of vehicles all
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *             example:
 *               - name: Toyota Corolla
 *                 type: Sedan
 *                 price: 15000
 *                 vehicleId: ABC-001
 *                 _id: 67e7aed6b812a1cd93bcd123
 *                 __v: 0
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
 */
router.put("/:vehicleId", updateVehicle);
router.delete("/:vehicleId", deleteVehicle);

module.exports = router;
