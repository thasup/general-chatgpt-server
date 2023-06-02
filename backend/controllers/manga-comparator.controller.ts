import { type Request, type Response } from "express";
import { chatCompletion } from "../utilities/openai";

function getManga (req: Request, res: Response): void {
  res.send("Hello! This is manga comparator API :D");
}

async function postManga (req: Request, res: Response): Promise<void> {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input for manga comparator"
    });
  }

  try {
    const charactor = await chatCompletion(input);

    res.status(200).json(charactor);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

export {
  getManga,
  postManga
};
