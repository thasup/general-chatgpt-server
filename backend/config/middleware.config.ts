import { type Express, type Request, type Response } from "express";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getCorsConfig } from "./cors.config";
import { envConfig } from "./env.config";

export const configureMiddleware = (app: Express): void => {
  // Basic middleware
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS configuration
  app.use(cors(getCorsConfig(envConfig.isDevelopment)));

  // Logging
  if (envConfig.isDevelopment) {
    app.use(morgan("dev"));
  }

  // Request timing middleware
  app.use((req: Request, res: Response, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
  });
};
