import swaggerJsdoc from "swagger-jsdoc";

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "General ChatGPT Server",
      version: "1.0.0"
    }
  },
  apis: ["./src/routes*.js"]
};

const openapiSpecification = swaggerJsdoc(options);
