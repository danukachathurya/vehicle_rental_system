const router = require("express").Router();
const {
  addMaintenance,
  deleteMaintenance,
  getAllMaintenance,
  getMaintenance,
  updateMaintenance,
} = require("../controllers/maintenance.controller");

/**
 * @swagger
 * /maintenance:
 *   get:
 *     summary: Get all maintenance records
 *     responses:
 *       200:
 *         description: List of all maintenance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     summary: Add maintenance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceCreateInput'
 *           example:
 *             vehicleId: ABC-001
 *             status: In service
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceCreateInput'
 *     responses:
 *       201:
 *         description: Maintenance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllMaintenance);
router.post("/", addMaintenance);

/**
 * @swagger
 * /maintenance/{vehicleId}:
 *   get:
 *     summary: Get maintenance history
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           example: ABC-001
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Maintenance history for the given vehicle
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Update maintenance record by vehicle ID
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           example: ABC-001
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceUpdate'
 *           example:
 *             status: Completed
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceUpdate'
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       400:
 *         description: Invalid vehicle ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Maintenance record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Delete maintenance record by vehicle ID
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *           example: ABC-001
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
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
 *       404:
 *         description: Maintenance record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:vehicleId", getMaintenance);
router.put("/:vehicleId", updateMaintenance);
router.delete("/:vehicleId", deleteMaintenance);

module.exports = router;
