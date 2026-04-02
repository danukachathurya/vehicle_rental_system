const swaggerJsDoc = require("swagger-jsdoc");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Maintenance API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5005" }],
    components: {
      schemas: {
        MaintenanceCreateInput: {
          type: "object",
          properties: {
            vehicleId: {
              type: "string",
            },
            status: {
              type: "string",
            },
          },
          required: ["vehicleId", "status"],
        },
        MaintenanceUpdate: {
          type: "object",
          properties: {
            vehicleId: {
              type: "string",
            },
            status: {
              type: "string",
            },
          },
        },
        Maintenance: {
          allOf: [
            { $ref: "#/components/schemas/MaintenanceCreateInput" },
            {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                __v: {
                  type: "integer",
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
            },
          },
        },
        DeleteResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});
