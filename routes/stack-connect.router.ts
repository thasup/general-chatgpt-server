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
 * @openapi
 *
 * /stack-connect/feelinks:
 *   post:
 *     tags: [Stack Connect]
 *     summary: Generate a Feelinks scenario
 *     description: Generates a scenario for the Feelinks game based on the provided category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the scenario.
 *                 example: "Family"
 *                 enum:
 *                   - Family
 *                   - Friend
 *                   - School
 *                   - Social
 *                   - Work
 *                   - Entertainment
 *               hasAudio:
 *                 type: boolean
 *                 description: (Optional) Whether to include audio in the response.
 *                 example: false
 *     responses:
 *       200:
 *         description: Successful response with a generated Feelinks scenario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scenario:
 *                   type: string
 *                   description: The generated scenario text.
 *                   example: "Your parents surprise you with a gift, but it's something you don't like. 🎁"
 *                 audio:
 *                   type: string
 *                   description: (Optional) Audio URL for the scenario text.
 *                   example: ""
 *       400:
 *         description: Invalid request, missing category input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing a category input"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post("/feelinks", postGenerateFeelinksScenario);

/**
 * @openapi
 *
 * /stack-connect/sounds-fishy:
 *   post:
 *     tags: [Stack Connect]
 *     summary: Generate a Sounds Fishy scenario
 *     description: Generates a trivia question for the Sounds Fishy game based on the provided category and language.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the trivia question.
 *                 example: "History"
 *               lang:
 *                 type: string
 *                 description: The language for the trivia question.
 *                 example: "en-US"
 *               hasAudio:
 *                 type: boolean
 *                 description: (Optional) Whether to include audio in the response.
 *                 example: false
 *     responses:
 *       200:
 *         description: Successful response with a generated Sounds Fishy scenario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scenario:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: The trivia question.
 *                       example: "Which animal was officially enlisted as a soldier in World War II?"
 *                     answer:
 *                       type: string
 *                       description: The correct answer to the trivia question.
 *                       example: "A bear named Wojtek"
 *                     reference:
 *                       type: string
 *                       description: A reference or explanation for the correct answer.
 *                       example: "Wojtek, a Syrian brown bear, was enlisted in the Polish Army in 1942 and helped carry artillery shells during the Battle of Monte Cassino in 1944."
 *       400:
 *         description: Invalid request, missing category input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing a category input"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post("/sounds-fishy", postGenerateSoundsFishyScenario);

/**
 * @openapi
 *
 * /stack-connect/ito:
 *   post:
 *     tags: [Stack Connect]
 *     summary: Generate an Ito question
 *     description: Generates a question for the Ito game based on the provided category and language.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the Ito question.
 *                 example: "Food"
 *               lang:
 *                 type: string
 *                 description: The language for the Ito question.
 *                 example: "en-US"
 *               hasAudio:
 *                 type: boolean
 *                 description: (Optional) Whether to include audio in the response.
 *                 example: false
 *     responses:
 *       200:
 *         description: Successful response with a generated Ito question.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: The Ito question.
 *                       example: "Most Addictive Snacks!"
 *                     least:
 *                       type: string
 *                       description: The least extreme choice for the Ito question.
 *                       example: "Easy to Stop Eating"
 *                     most:
 *                       type: string
 *                       description: The most extreme choice for the Ito question.
 *                       example: "Can't Stop Eating"
 *                 audio:
 *                   type: string
 *                   description: (Optional) Audio URL for the question text.
 *                   example: ""
 *       400:
 *         description: Invalid request, missing category input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing a category input"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post("/ito", postGenerateItoQuestion);

export default router;