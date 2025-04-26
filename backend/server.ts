import express from "express";
import colors from "colors";
import "openai/shims/node";

import { envConfig } from "@/config/env.config";
import { configureMiddleware } from "@/config/middleware.config";
import { configureRoutes } from "@/config/routes.config";

const app = express();

// Configure middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Start server
app.listen(envConfig.port, () => {
  console.log(
    colors.yellow(
      `Server running in ${String(envConfig.nodeEnv)} mode on port ${String(envConfig.port)}.`
    )
  );
  console.log(
    colors.yellow(
      `Server URL: http://localhost:${String(envConfig.port)}`
    )
  );
});
