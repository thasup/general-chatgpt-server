import { type Request, type Response } from "express";
import { chatCompletion, textCompletion } from "../utilities/openai";

function getSomething (req: Request, res: Response): void {
  res.send("Hello color!");
}

async function getColorsPalette (req: Request, res: Response): Promise<void> {
  const input = req.params.input;

  if (!input) {
    res.status(404).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await textCompletion(input);

    res.status(200).json(palette);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

async function postColorsPaletteInput (req: Request, res: Response): Promise<void> {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(input);

    res.status(200).json(palette);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

export {
  getSomething,
  getColorsPalette,
  postColorsPaletteInput
};
