import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitzo",
      version: "1.0.0",
      description:
        "HealthClub App",
      contact: {
        name: "Dev",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./server/docs/*.yaml"],
};

const specs = swaggerJsdoc(options);
export { specs };
