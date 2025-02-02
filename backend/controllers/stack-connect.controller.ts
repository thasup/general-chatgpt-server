import { type Request, type Response } from "express";

import { chatCompletion, openAiConfig } from "../utilities/openai";
import { handleApiResponse, handleError } from "../utilities/common";
import {
  generateScenerioChatInstruction
} from "../models/stack-connect.model";

async function postGenerateScenerio (req: Request, res: Response): Promise<void> {
  const { category } = req.body;

  if (!category) {
    res.status(400).json({
      error: "Missing a category input"
    });
    return;
  }

  try {
    const palette = await chatCompletion(
      {
        category
      },
      generateScenerioChatInstruction,
      {
        ...openAiConfig,
        temperature: 0.7, // Balanced creativity
        max_tokens: 200, // Set a reasonable max tokens for scenario length
        top_p: 1,
        n: 1, // Generate one completion
        stream: false // No streaming required for a one-shot response
      }
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

export {
  postGenerateScenerio
};
