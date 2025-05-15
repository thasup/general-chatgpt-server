import { type Request, type Response } from "express";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import { chatCompletion, openAiDefaultConfig, textToSpeech } from "@/utilities/openai";
import { handleApiResponse, handleError } from "@/utilities/common";
import {
  generateFeelinksScenerioChatInstruction,
  generateItoQuestionChatInstruction,
  generateSoundsFishyScenerioChatInstruction
} from "@/models/stack-connect.model";
import { OPENAI_MODEL } from "@/types/common";

interface SoundsFishyScenerio {
  question: string
  answer: string
  reference: string
}

interface ItoQuestion {
  question: string
  least: string
  most: string
}

async function postGenerateFeelinksScenario (req: Request, res: Response): Promise<void> {
  const { category } = req.body;

  if (!category) {
    res.status(400).json({
      error: "Missing a category input"
    });
    return;
  }

  try {
    const scenario = await chatCompletion({
      inputObj: {
        category
      },
      instruction: generateFeelinksScenerioChatInstruction,
      options: {
        ...openAiDefaultConfig,
        temperature: 1.2, // Encourages high creativity
        top_p: 0.9, // Diverse responses but still coherent
        frequency_penalty: 0.4, // Slightly discourages repetition
        presence_penalty: 1, // Encourages novelty in responses
        max_completion_tokens: 100, // Limits response length for efficiency
        n: 1, // Single response per request (adjust as needed)
        seed: Math.floor(Math.random() * 1000000) // Ensures a different output each time
      }
    });
    // const audio = await textToSpeech(scenario ?? "");

    handleApiResponse(res, {
      scenario,
      audio: ''
    });
  } catch (error) {
    handleError(res, error);
  }
}

async function postGenerateSoundsFishyScenario (req: Request, res: Response): Promise<void> {
  const { category, lang } = req.body;

  if (!category) {
    res.status(400).json({
      error: "Missing a category input"
    });
    return;
  }

  // Define a schema for response objects
  const ResponseSchema = z.object({
    question: z.string(),
    answer: z.string(),
    reference: z.string()
  });

  try {
    const response = await chatCompletion({
      inputObj: {
        category,
        lang: lang || "en"
      },
      instruction: generateSoundsFishyScenerioChatInstruction,
      options: {
        ...openAiDefaultConfig,
        temperature: 1.2, // Encourages high creativity
        top_p: 0.9, // Diverse responses but still coherent
        frequency_penalty: 0.4, // Slightly discourages repetition
        presence_penalty: 1, // Encourages novelty in responses
        max_completion_tokens: 500, // Limits response length for efficiency
        n: 1, // Single response per request (adjust as needed)
        seed: Math.floor(Math.random() * 1000000) // Ensures a different output each time
      },
      format: zodResponseFormat(ResponseSchema, "response_schema")
    });
    // parse JSON format from scenario data
    const scenario: SoundsFishyScenerio = JSON.parse(String(response));
    // call text to speech in parallel for question, answer, and reference, then send them to handleApiResponse
    // const audios = await Promise.all([
    //   textToSpeech(scenario.question)
    //   textToSpeech(scenario.answer),
    //   textToSpeech(scenario.reference)
    // ]);

    handleApiResponse(res, {
      scenario,
      // questionAudio: audios[0]
      // answerAudio: audios[1],
      // referenceAudio: audios[2]
    });
  } catch (error) {
    handleError(res, error);
  }
}

async function postGenerateItoQuestion (req: Request, res: Response): Promise<void> {
  const { category, lang } = req.body;

  if (!category) {
    res.status(400).json({
      error: "Missing a category input"
    });
    return;
  }

  // Define a schema for response objects
  const ResponseSchema = z.object({
    question: z.string(),
    least: z.string(),
    most: z.string()
  });

  try {
    const response = await chatCompletion({
      inputObj: {
        category,
        lang: lang || "en"
      },
      instruction: generateItoQuestionChatInstruction,
      options: {
        ...openAiDefaultConfig,
        temperature: 1.2, // Encourages high creativity
        top_p: 0.9, // Diverse responses but still coherent
        frequency_penalty: 0.4, // Slightly discourages repetition
        presence_penalty: 1, // Encourages novelty in responses
        max_completion_tokens: 100, // Limits response length for efficiency
        n: 1, // Single response per request (adjust as needed)
        seed: Math.floor(Math.random() * 1000000) // Ensures a different output each time
      },
      format: zodResponseFormat(ResponseSchema, "response_schema")
    });
    console.log("🚀 ~ postGenerateItoQuestion ~ response:", response)
    const data: ItoQuestion = JSON.parse(String(response));
    // const audio = await textToSpeech(data.question ?? "");
    console.log("🚀 ~ postGenerateItoQuestion ~ data:", data)

    handleApiResponse(res, {
      data,
      audio: ''
    });
  } catch (error) {
    handleError(res, error);
  }
}

export {
  postGenerateFeelinksScenario,
  postGenerateSoundsFishyScenario,
  postGenerateItoQuestion
};
