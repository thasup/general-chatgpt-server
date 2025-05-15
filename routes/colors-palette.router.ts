import express, { type Request, type Response } from "express";
import { getColorsPalette, postColorsPaletteChatCompletion } from "@/controllers/colors-palette.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define more specific routes first
/**
 * @openapi
 *
 * /colors/{input}:
 *   get:
 *     tags: [Colors]
 *     summary: Get color palette by input
 *     description: Returns a color palette based on the input description.
 *     parameters:
 *       - name: input
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Description or theme for the color palette
 *         example: "Neon Pastel"
 *     responses:
 *       200:
 *         description: Successful response with color palette
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Hex color codes
 *                 paletteName:
 *                   type: string
 *                   description: Name of the generated color palette
 *                 message:
 *                   type: string
 *                   description: Additional information about the palette
 *       400:
 *         description: Invalid input provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get("/:input", getColorsPalette);

/**
 * @openapi
 *
 * /colors/chat:
 *   post:
 *     tags: [Colors]
 *     summary: Generate color palette via chat
 *     description: Returns a color palette based on a text description provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: Description for the color palette
 *                 example: "warm sunset colors"
 *               format:
 *                 type: string
 *                 enum: [hex, rgb, hsl]
 *                 default: hex
 *                 description: Desired format for the color output
 *     responses:
 *       200:
 *         description: Successful response with generated color palette
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 colors:
 *                   type: array
 *                   items:
 *                     oneOf:
 *                       - type: string
 *                       - type: object
 *                   description: Color values in the requested format
 *                 description:
 *                   type: string
 *                   description: Description of the generated palette
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post("/chat", postColorsPaletteChatCompletion);

export default router;