const swaggerJsDoc = require("swagger-jsdoc");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Review API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5004" }],
  },
  apis: ["./routes/*.js"],
});