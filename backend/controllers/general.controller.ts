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
    const palette = await chatCompletion(
      {
        input
      },
      fixSpellingAndGrammarChatInstruction,
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
      openAiDefaultConfig
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
