import { type Request, type Response } from "express";

import { chatCompletion, openAiDefaultConfig, textToSpeech } from "../utilities/openai";
import { handleApiResponse, handleError } from "../utilities/common";
import {
  generateScenerioChatInstruction
} from "../models/stack-connect.model";

async function postGenerateScenario (req: Request, res: Response): Promise<void> {
  const { category } = req.body;

  if (!category) {
    res.status(400).json({
      error: "Missing a category input"
    });
    return;
  }

  try {
    const scenario = await chatCompletion(
      {
        category
      },
      generateScenerioChatInstruction,
      {
        ...openAiDefaultConfig,
        temperature: 0.9, // Balanced creativity
        max_completion_tokens: 200, // Set a reasonable max tokens for scenario length
        n: 1, // Generate one completion
        stream: false // No streaming required for a one-shot response
      }
    );
    const audio = await textToSpeech(scenario ?? "");

    handleApiResponse(res, {
      scenario,
      audio
    });
  } catch (error) {
    handleError(res, error);
  }
}

export {
  postGenerateScenario
};
