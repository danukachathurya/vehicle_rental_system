require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/booking.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/booking.swagger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/bookings", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, () =>
  console.log(`Booking Service running on ${process.env.PORT}`)
);
