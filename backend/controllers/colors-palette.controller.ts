import { type Request, type Response } from "express";

import { chatCompletion, openAiConfig, textCompletion } from "../utilities/openai";
import { colorsPaletteChatInstruction2, colorsPaletteChatInstruction3, colorsPaletteTextInstruction } from "../models/colors-palette.model";
import { handleApiResponse, handleError } from "../utilities/common";

async function getColorsPalette (req: Request, res: Response): Promise<void> {
  const input = req.params.input;
  const inputObj = {
    input
  };

  if (!inputObj.input) {
    res.status(404).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      inputObj,
      colorsPaletteChatInstruction2,
      openAiConfig
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

async function postColorsPaletteTextCompletion (req: Request, res: Response): Promise<void> {
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
      colorsPaletteTextInstruction,
      openAiConfig
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

async function postColorsPaletteChatCompletion (req: Request, res: Response): Promise<void> {
  const { input } = req.body;
  const inputObj = {
    input
  };

  if (!inputObj) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      inputObj,
      colorsPaletteChatInstruction3,
      openAiConfig
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

export {
  getColorsPalette,
  postColorsPaletteTextCompletion,
  postColorsPaletteChatCompletion
};
