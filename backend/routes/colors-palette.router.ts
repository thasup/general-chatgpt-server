import express, { type Request, type Response } from "express";

import { getColorsPalette, postColorsPaletteChatCompletion, postColorsPaletteTextCompletion } from "../controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define more specific routes first
router.post("/text", postColorsPaletteTextCompletion);
router.post("/chat", postColorsPaletteChatCompletion);
router.get("/:input", getColorsPalette);

export default router;
