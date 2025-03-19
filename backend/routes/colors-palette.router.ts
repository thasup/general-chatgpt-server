import express, { type Request, type Response } from "express";

import { getColorsPalette, postColorsPaletteChatCompletion } from "../controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define more specific routes first
/**
 * @swagger
 *
 * /{input}:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: input
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns a color palette based on input
 */
router.get("/:input", getColorsPalette);

/**
 * @swagger
 *
 * /chat:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: message
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns chat completion for colors palette
 */
router.post("/chat", postColorsPaletteChatCompletion);

export default router;
