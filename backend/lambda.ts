import serverless from "serverless-http";
import express from "express";
import "openai/shims/node";

import { configureMiddleware } from "./config/middleware.config";
import { configureRoutes } from "./config/routes.config";

// Create Express app
const app = express();

// Configure middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Export the serverless handler
export const handler = serverless(app);
