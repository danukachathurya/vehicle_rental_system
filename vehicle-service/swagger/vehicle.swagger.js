const swaggerJsDoc = require("swagger-jsdoc");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Vehicle API", version: "1.0.0" },
    servers: [{ url: "/" }],
    components: {
      schemas: {
        VehicleCreateInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Toyota Corolla" },
            type: { type: "string", example: "Sedan" },
            price: { type: "number", example: 15000 },
          },
          required: ["name", "type", "price"],
        },
        VehicleUpdate: {
          type: "object",
          properties: {
            name: { type: "string", example: "Toyota Corolla Altis" },
            type: { type: "string", example: "Sedan" },
            price: { type: "number", example: 16500 },
          },
        },
        Vehicle: {
          allOf: [
            { $ref: "#/components/schemas/VehicleCreateInput" },
            {
              type: "object",
              properties: {
                vehicleId: {
                  type: "string",
                  example: "ABC-001",
                },
                _id: {
                  type: "string",
                  example: "67e7aed6b812a1cd93bcd123",
                },
                __v: {
                  type: "integer",
                  example: 0,
                },
              },
            },
          ],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Server error",
            },
          },
        },
        DeleteResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Vehicle deleted successfully",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});
