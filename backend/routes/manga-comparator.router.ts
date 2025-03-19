import express, { type Request, type Response } from "express";

import { getManga, postManga } from "../controllers/manga-comparator.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

/**
 * @swagger
 *
 * /manga/:
 *   get:
 *     tags: [Manga]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns manga API information
 */
router.get("/", getManga);

/**
 * @swagger
 *
 * /manga/:
 *   post:
 *     tags: [Manga]
 *     produces:
 *       - application/json
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
 *         description: Submits manga data for processing
 */
router.post("/", postManga);

export default router;
