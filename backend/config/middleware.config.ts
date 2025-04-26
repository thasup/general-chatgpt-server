import { type Express, type Request, type Response } from "express";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
// import { apiReference } from "@scalar/express-api-reference";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { getCorsConfig } from "./cors.config";
import { envConfig } from "./env.config";

// Rate limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  // Custom key generator that works in Lambda environment
  keyGenerator: (req: Request): string => {
    // Try to get IP from various sources including Lambda-specific headers
    const ip =
      req.ip ??
      req.headers["x-forwarded-for"] ??
      req.headers["x-real-ip"] ??
      req.socket.remoteAddress ??
      "unknown-ip";

    return typeof ip === "string"
      ? ip
      : Array.isArray(ip)
        ? ip[0]
        : "unknown-ip";
  },
  // Skip failed requests for API testing purposes
  skip: (req: Request, res: Response): boolean => {
    // Skip rate limiting in development or for testing
    return envConfig.isDevelopment || req.headers["x-test-request"] === "true";
  }
});

export const configureMiddleware = (app: Express): void => {
  // Security middleware
  app.use(helmet());
  app.use(limiter);

  // Basic middleware
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  // CORS configuration
  app.use(cors(getCorsConfig(envConfig.isDevelopment)));

  // Logging
  if (envConfig.isDevelopment) {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: "3.0.0",
      info: {
        title: "General ChatGPT Server",
        version: "1.0.0"
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT ?? 9999}/v1`
        }
      ]
    },
    apis: ["./backend/**/*.ts"]
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // app.use(
  //   "/reference",
  //   apiReference({
  //     theme: "purple",
  //     url: "/openapi.json"
  //   })
  // );

  // Request timing middleware
  app.use((req: Request, res: Response, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const delta = Date.now() - start;
      console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
    });
    next();
  });
};
