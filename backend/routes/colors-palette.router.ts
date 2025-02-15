import express, { type Request, type Response } from "express";

import { getColorsPalette, postColorsPaletteChatCompletion } from "../controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define more specific routes first
router.get("/:input", getColorsPalette);
router.post("/chat", postColorsPaletteChatCompletion);

export default router;
