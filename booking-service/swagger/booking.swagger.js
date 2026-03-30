const swaggerJsDoc = require("swagger-jsdoc");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Booking API", version: "1.0.0" },
    servers: [{ url: "/" }],
    components: {
      schemas: {
        BookingCreateInput: {
          type: "object",
          properties: {
            vehicleBrand: { type: "string" },
            vehicleModel: { type: "string" },
            vehicleColor: { type: "string" },
            date: { type: "string" },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled", "completed"],
            },
          },
          required: [
            "vehicleBrand",
            "vehicleModel",
            "vehicleColor",
            "date",
          ],
        },
        Booking: {
          allOf: [
            { $ref: "#/components/schemas/BookingCreateInput" },
            {
              type: "object",
              properties: {
                bookingId: {
                  type: "string",
                },
                _id: {
                  type: "string",
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                },
              },
            },
          ],
        },
        BookingUpdate: {
          type: "object",
          properties: {
            vehicleBrand: { type: "string" },
            vehicleModel: { type: "string" },
            vehicleColor: { type: "string" },
            date: { type: "string" },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled", "completed"],
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
        NotFoundResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
        ServerErrorResponse: {
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
