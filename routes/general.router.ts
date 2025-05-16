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
 * @openapi
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
 * @openapi
 *
 * /general/:
 *   get:
 *     tags: [General]
 *     summary: Get general API information
 *     description: Returns a greeting message from the general API.
 *     responses:
 *       200:
 *         description: Successful response with a greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Hello! This is general API :D"
 */
router.get("/", getSomething);

/**
 * @openapi
 *
 * /general/fix-grammar:
 *   post:
 *     tags: [General]
 *     summary: Fix spelling and grammar
 *     description: Corrects spelling and grammar in the provided text.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with corrected text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The corrected text.
 *               example: "This is an example of corrected text."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/fix-grammar", postFixSpellingAndGrammar);

/**
 * @openapi
 *
 * /general/summarize:
 *   post:
 *     tags: [General]
 *     summary: Summarize text
 *     description: Summarizes the provided text into a concise abstract paragraph.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with summarized text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The summarized text.
 *               example: "This is a summary of the example text."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/summarize", postSummarize);

/**
 * @openapi
 *
 * /general/rewrite:
 *   post:
 *     tags: [General]
 *     summary: Rewrite text
 *     description: Rewrites the provided text to be more concise and well-written while preserving the original meaning.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with rewritten text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The rewritten text.
 *               example: "This is an example of rewritten text."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/rewrite", postRewrite);

/**
 * @openapi
 *
 * /general/explain:
 *   post:
 *     tags: [General]
 *     summary: Explain text
 *     description: Explains the provided text clearly and concisely.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with explained text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The explained text.
 *               example: "This is an explanation of the example text."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/explain", postExplain);

/**
 * @openapi
 *
 * /general/translate:
 *   post:
 *     tags: [General]
 *     summary: Translate text
 *     description: Translates the provided text into the specified language.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with translated text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The translated text.
 *               example: "This is a translation of the example text."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/translate", postTranslate);

/**
 * @openapi
 *
 * /general/brainstorm:
 *   post:
 *     tags: [General]
 *     summary: Brainstorm ideas
 *     description: Generates 10 creative ideas based on the provided topic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with brainstormed ideas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               description: An array of brainstormed ideas.
 *               example:
 *                 - "Idea 1: ..."
 *                 - "Idea 2: ..."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/brainstorm", postBrainstorm);

/**
 * @openapi
 *
 * /general/outline:
 *   post:
 *     tags: [General]
 *     summary: Outline topic
 *     description: Generates an outline for the provided topic, including titles, chapters, and subsections in Markdown format.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with the topic outline.
 *         content:
 *           text/markdown:
 *             schema:
 *               type: string
 *               description: The topic outline in Markdown format.
 *               example: "# Title\n## Chapter 1\n### Section 1\n..."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/outline", postOutline);

/**
 * @openapi
 *
 * /general/write-blog:
 *   post:
 *     tags: [General]
 *     summary: Write blog post
 *     description: Generates a blog post based on the provided topic, including a title, content, and conclusion in Markdown format.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with the generated blog post.
 *         content:
 *           text/markdown:
 *             schema:
 *               type: string
 *               description: The generated blog post in Markdown format.
 *               example: "# Blog Title\n## Introduction\n...\n## Conclusion"
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/write-blog", postWriteBlog);

/**
 * @openapi
 *
 * /general/shorter:
 *   post:
 *     tags: [General]
 *     summary: Shorten text
 *     description: Rewrites the provided text to be shorter while keeping the core meaning the same.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with shortened text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The shortened text.
 *               example: "This is a shortened example."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/shorter", postShorter);

/**
 * @openapi
 *
 * /general/longer:
 *   post:
 *     tags: [General]
 *     summary: Lengthen text
 *     description: Rewrites the provided text to be longer while keeping the core meaning the same.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextInput'
 *     responses:
 *       200:
 *         description: Successful response with lengthened text.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: The lengthened text.
 *               example: "This is a longer example of some text."
 *       400:
 *         description: Invalid input provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Missing an input"
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
router.post("/longer", postLonger);

export default router;