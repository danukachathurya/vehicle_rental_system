require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/vehicle.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/vehicle.swagger");

const app = express();
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/vehicles", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Vehicle Service running on ${process.env.PORT}`)
);
