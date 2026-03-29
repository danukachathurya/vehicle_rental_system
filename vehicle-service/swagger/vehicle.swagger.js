const swaggerJsDoc = require("swagger-jsdoc");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "vehicle API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5002" }],
  },
  apis: ["./routes/*.js"],
});