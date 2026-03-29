require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/maintenance.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/maintenance.swagger");

const app = express();
app.use(express.json());

connectDB();

app.use("/maintenance", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, () =>
  console.log(`Maintenance Service running on ${process.env.PORT}`)
);