const swaggerJsDoc = require("swagger-jsdoc");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Review API", version: "1.0.0" },
    servers: [{ url: "/", description: "API Gateway" }],
    components: {
      schemas: {
        Review: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "67f1234567890abc12345678",
            },
            vehicleId: {
              type: "string",
              example: "VEH-001",
            },
            rating: {
              type: "number",
              example: 4,
            },
            comment: {
              type: "string",
              example: "Clean vehicle and smooth ride.",
            },
          },
        },
        ReviewInput: {
          type: "object",
          required: ["vehicleId", "rating", "comment"],
          properties: {
            vehicleId: {
              type: "string",
              example: "VEH-001",
            },
            rating: {
              type: "number",
              example: 5,
            },
            comment: {
              type: "string",
              example: "Very comfortable and well maintained.",
            },
          },
        },
        ReviewUpdateInput: {
          type: "object",
          properties: {
            vehicleId: {
              type: "string",
              example: "VEH-001",
            },
            rating: {
              type: "number",
              example: 3,
            },
            comment: {
              type: "string",
              example: "Updated review comment.",
            },
          },
        },
        ReviewListResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Reviews fetched successfully",
            },
            count: {
              type: "number",
              example: 2,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Review",
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Review not found",
            },
          },
        },
        DeleteResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Review deleted successfully",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});
