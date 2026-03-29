require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/user.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/user.swagger");

const app = express();
app.use(express.json());

connectDB();

app.use("/users", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, () =>
  console.log(`User Service running on ${process.env.PORT}`)
);