import express, { type Request, type Response } from "express";

import {
  postGenerateFeelinksScenario,
  postGenerateItoQuestion,
  postGenerateSoundsFishyScenario
} from "@/controllers/stack-connect.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

/**
 * @swagger
 *
 * /stack-connect/feelinks:
 *   post:
 *     tags: [Stack Connect]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the scenario
 *                 example: "music"
 *     responses:
 *       200:
 *         description: Generates a feelinks scenario
 */
router.post("/feelinks", postGenerateFeelinksScenario);

/**
 * @swagger
 *
 * /stack-connect/sounds-fishy:
 *   post:
 *     tags: [Stack Connect]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the scenario
 *                 example: "music"
 *               lang:
 *                 type: string
 *                 description: The language of the scenario
 *                 example: "en-US"
 *     responses:
 *       200:
 *         description: Generates a sounds fishy scenario
 */
router.post("/sounds-fishy", postGenerateSoundsFishyScenario);

/**
 * @swagger
 *
 * /stack-connect/ito:
 *   post:
 *     tags: [Stack Connect]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the scenario
 *                 example: "music"
 *               lang:
 *                 type: string
 *                 description: The language of the scenario
 *                 example: "en-US"
 *     responses:
 *       200:
 *         description: Generates an Ito question
 */
router.post("/ito", postGenerateItoQuestion);

export default router;
