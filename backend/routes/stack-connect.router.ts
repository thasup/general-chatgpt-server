import express, { type Request, type Response } from "express";

import { postGenerateScenario } from "../controllers/stack-connect.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define generic routes at the end
router.post("/", postGenerateScenario);

export default router;
