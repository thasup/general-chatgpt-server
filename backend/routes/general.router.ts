import express, { type Request, type Response } from "express";

import { getSomething, postBrainstorm, postExplain, postFixSpellingAndGrammar, postLonger, postOutline, postRewrite, postShorter, postSummarize, postTranslate, postWriteBlog } from "../controllers/general.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

/**
 * @swagger
 *
 * /:
 *   get:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns something
 */
router.get("/", getSomething);

/**
 * @swagger
 *
 * /fix-grammar:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Fixes grammar in the provided text
 */
router.post("/fix-grammar", postFixSpellingAndGrammar);

/**
 * @swagger
 *
 * /summarize:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Summarizes the provided text
 */
router.post("/summarize", postSummarize);

/**
 * @swagger
 *
 * /rewrite:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Rewrites the provided text
 */
router.post("/rewrite", postRewrite);

/**
 * @swagger
 *
 * /explain:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Explains the provided text
 */
router.post("/explain", postExplain);

/**
 * @swagger
 *
 * /translate:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Translates the provided text
 */
router.post("/translate", postTranslate);

/**
 * @swagger
 *
 * /brainstorm:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: topic
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Brainstorms ideas for the provided topic
 */
router.post("/brainstorm", postBrainstorm);

/**
 * @swagger
 *
 * /outline:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: topic
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Outlines the provided topic
 */
router.post("/outline", postOutline);

/**
 * @swagger
 *
 * /write-blog:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: topic
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Writes a blog post on the provided topic
 */
router.post("/write-blog", postWriteBlog);

/**
 * @swagger
 *
 * /shorter:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Shortens the provided text
 */
router.post("/shorter", postShorter);

/**
 * @swagger
 *
 * /longer:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Lengthens the provided text
 */
router.post("/longer", postLonger);

export default router;
