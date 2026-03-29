require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/vehicle.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

// DB connect
connectDB();

// Swagger config
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./routes/*.js"],
});

// Routes
app.use("/vehicles", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Vehicle Service running on ${process.env.PORT}`)
);