import express, { type Request, type Response } from "express";

import { getSomething, getColorsPalette, postColorsPaletteChatCompletion, postColorsPaletteTextCompletion } from "../controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

router.get("/", getSomething);
router.get("/:input", getColorsPalette);
router.post("/text", postColorsPaletteTextCompletion);
router.post("/chat", postColorsPaletteChatCompletion);

export default router;
