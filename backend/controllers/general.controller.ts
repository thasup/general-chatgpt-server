import { type Request, type Response } from "express";
import { openAiConfig, textCompletion } from "../utilities/openai";
import { fixSpellingAndGrammarTextInstruction, summarizeTextInstruction } from "../models/general.model";
import { handleApiResponse, handleError } from "../utilities/common";

function getSomething (req: Request, res: Response): void {
  res.send("Hello! This is general API :D");
}

async function postFixSpellingAndGrammarTextCompletion (req: Request, res: Response): Promise<void> {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await textCompletion(
      {
        input
      },
      fixSpellingAndGrammarTextInstruction,
      openAiConfig
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

async function postSummarizeTextCompletion (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await textCompletion(
      {
        lang,
        input
      },
      summarizeTextInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
  }
}

export {
  getSomething,
  postFixSpellingAndGrammarTextCompletion,
  postSummarizeTextCompletion
};
