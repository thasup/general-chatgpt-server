import { type Request, type Response } from "express";

import { chatCompletion, openAiDefaultConfig } from "../utilities/openai";
import { handleApiResponse, handleError } from "../utilities/common";
import {
  brainstormChatInstruction,
  explainChatInstruction,
  fixSpellingAndGrammarChatInstruction,
  longerChatInstruction,
  outlineChatInstruction,
  rewriteChatInstruction,
  shorterChatInstruction,
  summarizeChatInstruction,
  translateChatInstruction,
  writeBlogChatInstruction
} from "../models/general.model";

function getSomething (req: Request, res: Response): void {
  res.send("Hello! This is general API :D");
}

async function postFixSpellingAndGrammar (req: Request, res: Response): Promise<void> {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion({
      inputObj: {
        input
      },
      instruction: fixSpellingAndGrammarChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, palette);
  } catch (error) {
    handleError(res, error);
  }
}

async function postSummarize (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        lang: lang || "en", // Default to English
        input
      },
      instruction: summarizeChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postRewrite (req: Request, res: Response): Promise<void> {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input
      },
      instruction: rewriteChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postExplain (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang: lang || "en"
      },
      instruction: explainChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postTranslate (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  } else if (!lang) {
    res.status(400).json({
      error: "Missing a language"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang
      },
      instruction: translateChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postBrainstorm (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang: lang || "en"
      },
      instruction: brainstormChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postOutline (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang: lang || "en"
      },
      instruction: outlineChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postWriteBlog (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang: lang || "en"
      },
      instruction: writeBlogChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postShorter (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang: lang || "en"
      },
      instruction: shorterChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

async function postLonger (req: Request, res: Response): Promise<void> {
  const { lang, input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const response = await chatCompletion({
      inputObj: {
        input,
        lang: lang || "en"
      },
      instruction: longerChatInstruction,
      options: openAiDefaultConfig
    });

    handleApiResponse(res, response);
  } catch (error) {
    handleError(res, error);
  }
}

export {
  getSomething,
  postFixSpellingAndGrammar,
  postSummarize,
  postRewrite,
  postExplain,
  postTranslate,
  postBrainstorm,
  postOutline,
  postWriteBlog,
  postShorter,
  postLonger
};
