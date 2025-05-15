import { type Request, type Response } from "express";

import { chatCompletion, openAiDefaultConfig } from "@/utilities/openai";
import { handleApiResponse, handleError } from "@/utilities/common";
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
} from "@/models/general.model";
import { DEEPSEEK_MODEL, GEMINI_MODEL, OPENAI_MODEL } from "@/types/common";

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
      options: {
        ...openAiDefaultConfig,
        temperature: 1
      }
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
      options: {
        max_completion_tokens: 1000,
        temperature: 0.4
      }
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
      model: OPENAI_MODEL.GPT_4_1_NANO,
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
      model: GEMINI_MODEL.GEMINI_FLASH_1_5_8B,
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
      model: DEEPSEEK_MODEL.DEEPSEEK_R1_FREE,
      instruction: brainstormChatInstruction,
      options: {
        max_completion_tokens: 2000
      }
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
      model: DEEPSEEK_MODEL.DEEPSEEK_R1_FREE,
      instruction: outlineChatInstruction,
      options: {
        max_completion_tokens: 2000
      }
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
      model: OPENAI_MODEL.GPT_4O_MINI,
      instruction: writeBlogChatInstruction,
      options: {
        ...openAiDefaultConfig,
        max_completion_tokens: 1000,
        temperature: 0.7
      }
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
      options: {
        max_completion_tokens: 1000
      }
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
