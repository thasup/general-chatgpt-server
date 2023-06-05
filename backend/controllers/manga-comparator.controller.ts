import { type Request, type Response } from "express";

import { chatCompletion } from "../utilities/openai";
import { mangaComparatorChatInstruction } from "../models/manga-comparator.model";

function getManga (req: Request, res: Response): void {
  res.send("Hello! This is manga comparator API :D");
}

async function postManga (req: Request, res: Response): Promise<void> {
  const { char1, char2, manga1, manga2 } = req.body;
  const mangaInput = {
    char1,
    char2,
    manga1,
    manga2
  };

  if (!mangaInput) {
    res.status(400).json({
      error: "Missing an input for manga comparator"
    });
  }

  try {
    const charactor = await chatCompletion(
      mangaInput,
      mangaComparatorChatInstruction,
      {
        max_tokens: 300,
        temperature: 0,
        top_p: 1
      }
    );

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
