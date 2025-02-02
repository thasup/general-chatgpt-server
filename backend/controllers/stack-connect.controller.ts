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
  }

  try {
    const palette = await chatCompletion(
      {
        category
      },
      generateScenerioChatInstruction,
      openAiConfig
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

export {
  postGenerateScenerio
};
