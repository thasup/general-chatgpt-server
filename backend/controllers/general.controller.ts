import { type Request, type Response } from "express";

import { chatCompletion, openAiConfig } from "../utilities/openai";
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
    const palette = await chatCompletion(
      {
        input
      },
      fixSpellingAndGrammarChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        lang: lang || "en", // Default to English
        input
      },
      summarizeChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input
      },
      rewriteChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang: lang || "en"
      },
      explainChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang
      },
      translateChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang: lang || "en"
      },
      brainstormChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang: lang || "en"
      },
      outlineChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang: lang || "en"
      },
      writeBlogChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang: lang || "en"
      },
      shorterChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
    const response = await chatCompletion(
      {
        input,
        lang: lang || "en"
      },
      longerChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, response);
  } catch (error) {
    await handleError(res, error);
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
