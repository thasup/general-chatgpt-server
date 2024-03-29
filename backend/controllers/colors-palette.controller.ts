import { type Request, type Response } from "express";

import { chatCompletion, textCompletion } from "../utilities/openai";
import { colorsPaletteChatInstruction2, colorsPaletteChatInstruction3, colorsPaletteTextInstruction } from "../models/colors-palette.model";

function getSomething (req: Request, res: Response): void {
  res.send("Hello! This is colors palette generator API :D");
}

async function getColorsPalette (req: Request, res: Response): Promise<void> {
  const input = req.params.input;
  const inputObj = {
    input
  };

  if (!inputObj) {
    res.status(404).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      inputObj,
      colorsPaletteChatInstruction2,
      {
        max_tokens: 500,
        temperature: 0.5,
        top_p: 0.5
      }
    );

    if (!palette) {
      res.status(500).json({
        error: "Something went wrong!"
      });
    }

    const jsonResponse = {
      result: JSON.parse(palette as string)
    };

    res.status(200).json(jsonResponse);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
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
      input,
      colorsPaletteTextInstruction,
      {
        max_tokens: 500,
        temperature: 0.5,
        top_p: 0.5
      }
    );

    res.status(200).json(palette);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
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
      {
        max_tokens: 500,
        temperature: 0.5,
        top_p: 0.5
      }
    );

    if (!palette) {
      res.status(500).json({
        error: "Something went wrong!"
      });
    }

    const jsonResponse = {
      result: JSON.parse(palette as string)
    };

    res.status(200).json(jsonResponse);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

export {
  getSomething,
  getColorsPalette,
  postColorsPaletteTextCompletion,
  postColorsPaletteChatCompletion
};
