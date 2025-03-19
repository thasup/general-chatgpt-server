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
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns manga information
 */
router.get("/", getManga);

/**
 * @swagger
 *
 * /manga/:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mangaData
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Submits manga data for processing
 */
router.post("/", postManga);

export default router;
