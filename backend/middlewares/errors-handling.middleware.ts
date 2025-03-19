import { type NextFunction, type Request, type Response } from "express";
import { AppError, NotFoundError } from "../types/errors";
import { envConfig } from "../config/env.config";
import { ZodError } from "zod";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Not found - ${req.originalUrl}`));
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", {
    message: err.message,
    stack: err.stack
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.errors
    });
    return;
  }

  // Handle custom AppErrors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      isOperational: err.isOperational,
      stack: envConfig.isDevelopment ? err.stack : undefined
    });
    return;
  }

  // Handle unknown errors
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: "error",
    message: envConfig.isDevelopment ? err.message : "Internal server error",
    stack: envConfig.isDevelopment ? err.stack : undefined
  });
};

export {
  notFound,
  errorHandler
};
