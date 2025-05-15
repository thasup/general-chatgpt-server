import express, { type Request, type Response } from "express";
import { getManga, postManga } from "@/controllers/manga-comparator.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

/**
 * @openapi
 *
 * /manga/:
 *   get:
 *     tags: [Manga]
 *     summary: Get manga API information
 *     description: Returns a greeting message from the manga comparator API.
 *     responses:
 *       200:
 *         description: Successful response with a greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Hello! This is manga comparator API :D"
 */
router.get("/", getManga);

/**
 * @openapi
 *
 * /manga/:
 *   post:
 *     tags: [Manga]
 *     summary: Compare two manga characters
 *     description: Compares two manga characters and returns the stronger character along with a score and reasoning.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               char1:
 *                 type: string
 *                 description: The first character to compare
 *                 example: "Kaido"
 *               char2:
 *                 type: string
 *                 description: The second character to compare
 *                 example: "Nagato"
 *               manga1:
 *                 type: string
 *                 description: The manga of the first character
 *                 example: "One Piece"
 *               manga2:
 *                 type: string
 *                 description: The manga of the second character
 *                 example: "Naruto"
 *     responses:
 *       200:
 *         description: Successful response with comparison results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 winner:
 *                   type: string
 *                   description: Name of the winning character
 *                   example: "Kaido from One Piece"
 *                 reason:
 *                   type: string
 *                   description: Reason why the winner is stronger
 *                   example: "Kaido is the strongest creature in the world of One Piece."
 *                 scores:
 *                   type: object
 *                   properties:
 *                     char1Score:
 *                       type: integer
 *                       description: Score of the first character
 *                       example: 100
 *                     char2Score:
 *                       type: integer
 *                       description: Score of the second character
 *                       example: 80
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
router.post("/", postManga);

export default router;