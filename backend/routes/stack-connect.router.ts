import express, { type Request, type Response } from "express";

import {
  postGenerateFeelinksScenario,
  postGenerateItoQuestion,
  postGenerateSoundsFishyScenario
} from "../controllers/stack-connect.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

/**
 * @swagger
 *
 * /feelinks:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: scenario
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Generates a feelinks scenario
 */
router.post("/feelinks", postGenerateFeelinksScenario);

/**
 * @swagger
 *
 * /sounds-fishy:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: scenario
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Generates a sounds fishy scenario
 */
router.post("/sounds-fishy", postGenerateSoundsFishyScenario);

/**
 * @swagger
 *
 * /ito:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: question
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Generates an Ito question
 */
router.post("/ito", postGenerateItoQuestion);

export default router;
