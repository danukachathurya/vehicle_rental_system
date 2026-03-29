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
            vehicleBrand: { type: "string", example: "Toyota" },
            vehicleModel: { type: "string", example: "Corolla" },
            vehicleColor: { type: "string", example: "White" },
            date: { type: "string", example: "2026-03-29" },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled", "completed"],
              example: "pending",
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
                  example: "BKG-1743243950182-A1B2C3",
                },
                userId: {
                  type: "string",
                  example: "USR-1743243950182-D4E5F6",
                },
                vehicleId: {
                  type: "string",
                  example: "VEH-1743243950182-9A8B7C",
                },
                _id: {
                  type: "string",
                  example: "67e7aed6b812a1cd93bcd123",
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  example: "2026-03-29T09:30:00.000Z",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                  example: "2026-03-29T09:30:00.000Z",
                },
              },
            },
          ],
        },
        BookingUpdate: {
          type: "object",
          properties: {
            vehicleBrand: { type: "string", example: "Toyota" },
            vehicleModel: { type: "string", example: "Corolla" },
            vehicleColor: { type: "string", example: "Black" },
            date: { type: "string", example: "2026-04-02" },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled", "completed"],
              example: "confirmed",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Booking validation failed",
            },
          },
        },
        DeleteResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Booking deleted successfully",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});
