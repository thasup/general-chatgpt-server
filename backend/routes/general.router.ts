import express, { type Request, type Response } from "express";

import { getSomething, postBrainstorm, postExplain, postFixSpellingAndGrammar, postLonger, postOutline, postRewrite, postShorter, postSummarize, postTranslate, postWriteBlog } from "../controllers/general.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define generic routes at the end
router.get("/", getSomething);
router.post("/fix-grammar", postFixSpellingAndGrammar);
router.post("/summarize", postSummarize);
router.post("/rewrite", postRewrite);
router.post("/explain", postExplain);
router.post("/translate", postTranslate);
router.post("/brainstorm", postBrainstorm);
router.post("/outline", postOutline);
router.post("/write-blog", postWriteBlog);
router.post("/shorter", postShorter);
router.post("/longer", postLonger);

export default router;
