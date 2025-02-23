import express, { type Request, type Response } from "express";

import {
  postGenerateFeelinksScenario,
  postGenerateItoQuestion,
  postGenerateSoundsFishyScenario
} from "../controllers/stack-connect.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define generic routes at the end
router.post("/", postGenerateFeelinksScenario);
router.post("/sounds-fishy", postGenerateSoundsFishyScenario);
router.post("/ito", postGenerateItoQuestion);

export default router;
