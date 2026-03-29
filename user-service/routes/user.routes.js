const router = require("express").Router();
const { register, login } = require("../controllers/user.controller");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register user
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 */
router.post("/login", login);

module.exports = router;