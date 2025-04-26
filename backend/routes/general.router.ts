import express, { type Request, type Response } from "express";

import {
  getSomething,
  postBrainstorm,
  postExplain,
  postFixSpellingAndGrammar,
  postLonger,
  postOutline,
  postRewrite,
  postShorter,
  postSummarize,
  postTranslate,
  postWriteBlog
} from "@/controllers/general.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     TextInput:
 *       type: object
 *       properties:
 *         input:
 *           type: string
 *           description: The text to be processed
 *           example: "This is an example text."
 *         lang:
 *           type: string
 *           description: The language to be processed
 *           example: "en-US"
 */

/**
 * @swagger
 *
 * /general/:
 *   get:
 *     tags: [General]
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
 * /general/fix-grammar:
 *   post:
 *     tags: [General]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Fixes grammar in the provided text
 */
router.post("/fix-grammar", postFixSpellingAndGrammar);

/**
 * @swagger
 *
 * /general/summarize:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Summarizes the provided text
 */
router.post("/summarize", postSummarize);

/**
 * @swagger
 *
 * /general/rewrite:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Rewrites the provided text
 */
router.post("/rewrite", postRewrite);

/**
 * @swagger
 *
 * /general/explain:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Explains the provided text
 */
router.post("/explain", postExplain);

/**
 * @swagger
 *
 * /general/translate:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Translates the provided text
 */
router.post("/translate", postTranslate);

/**
 * @swagger
 *
 * /general/brainstorm:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Brainstorms ideas for the provided topic
 */
router.post("/brainstorm", postBrainstorm);

/**
 * @swagger
 *
 * /general/outline:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Outlines the provided topic
 */
router.post("/outline", postOutline);

/**
 * @swagger
 *
 * /general/write-blog:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Writes a blog post on the provided topic
 */
router.post("/write-blog", postWriteBlog);

/**
 * @swagger
 *
 * /general/shorter:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Shortens the provided text
 */
router.post("/shorter", postShorter);

/**
 * @swagger
 *
 * /general/longer:
 *   post:
 *     tags: [General]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Lengthens the provided text
 */
router.post("/longer", postLonger);

export default router;
