import { type Request, type Response } from "express";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import { chatCompletion } from "@/utilities/openai";
import { mangaComparatorChatInstruction } from "@/models/manga-comparator.model";
import { handleApiResponse, handleError } from "@/utilities/common";
import { GEMINI_MODEL } from "@/types/common";

const MangaComparisonResponseSchema = z.object({
  winner: z.string().describe("Name of the winning character"),
  reason: z.string().describe("Reason why the winner is stronger"),
  scores: z.object({
    char1Score: z.number().int().describe("Score of the first character"),
    char2Score: z.number().int().describe("Score of the second character")
  })
});

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
      format: zodResponseFormat(MangaComparisonResponseSchema, "manga_comparison_schema")
    });

    // Validate the response against the schema
    const parsedResponse = MangaComparisonResponseSchema.safeParse(JSON.parse(String(charactorResponse)));

    if (parsedResponse.success) {
      handleApiResponse(res, parsedResponse.data); // Send the parsed data
    } else {
      res.status(500).json({ error: "Internal server error: Response validation failed" });
    }
  } catch (error) {
    handleError(res, error);
  }
}

export {
  getManga,
  postManga
};