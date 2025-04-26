import express, { type Request, type Response } from "express";

import { getColorsPalette, postColorsPaletteChatCompletion } from "@/controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define more specific routes first
/**
 * @swagger
 *
 * /colors/{input}:
 *   get:
 *     tags: [Colors]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: input
 *         in: path
 *         required: true
 *         type: string
 *         description: Description or theme for the color palette
 *         example: "Neon Pastel"
 *     responses:
 *       200:
 *         description: Returns a color palette based on input
 */
router.get("/:input", getColorsPalette);

/**
 * @swagger
 *
 * /colors/chat:
 *   post:
 *     tags: [Colors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: The description or theme for the color palette
 *                 example: "Neon Pastel"
 *     responses:
 *       200:
 *         description: Returns chat completion for colors palette
 */
router.post("/chat", postColorsPaletteChatCompletion);

export default router;
