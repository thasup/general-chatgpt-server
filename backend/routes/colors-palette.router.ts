import express, { type Request, type Response } from "express";

import { getSomething, getColorsPalette, postColorsPaletteInput } from "../controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

router.post("/", postColorsPaletteInput);
router.get("/", getSomething);
router.get("/:input", getColorsPalette);

export default router;
