import { type Request, type Response } from "express";

import { chatCompletion } from "@/utilities/openai";
import { mangaComparatorChatInstruction } from "@/models/manga-comparator.model";
import { handleApiResponse, handleError } from "@/utilities/common";
import { GEMINI_MODEL } from "@/types/common";

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
    const charactorResponse = await chatCompletion({
      inputObj: mangaInput,
      instruction: mangaComparatorChatInstruction,
      options: {
        max_completion_tokens: 300,
        temperature: 0,
        top_p: 1
      },
      model: GEMINI_MODEL.GEMMA_3_1B_FREE
    });

    handleApiResponse(res, charactorResponse);
  } catch (error) {
    handleError(res, error);
  }
}

export {
  getManga,
  postManga
};
