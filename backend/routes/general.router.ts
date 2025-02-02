import express, { type Request, type Response } from "express";

import { getSomething, postFixSpellingAndGrammarTextCompletion, postSummarizeTextCompletion } from "../controllers/general.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

// Define generic routes at the end
router.get("/", getSomething);
router.post("/fix-grammar", postFixSpellingAndGrammarTextCompletion);
router.post("/summarize", postSummarizeTextCompletion);

export default router;
