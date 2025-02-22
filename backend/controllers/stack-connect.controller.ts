import { type Request, type Response } from "express";

import { chatCompletion, openAiDefaultConfig, textToSpeech } from "../utilities/openai";
import { handleApiResponse, handleError } from "../utilities/common";
import {
  generateFeelinksScenerioChatInstruction,
  generateSoundsFishyScenerioChatInstruction
} from "../models/stack-connect.model";

interface SoundsFishyScenerio {
  question: string
  answer: string
  reference: string
  category: string
  lang: string
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
    const scenario = await chatCompletion(
      {
        category
      },
      generateFeelinksScenerioChatInstruction,
      {
        ...openAiDefaultConfig,
        temperature: 0.9, // Balanced creativity
        max_completion_tokens: 200, // Set a reasonable max tokens for scenario length
        n: 1, // Generate one completion
        stream: false // No streaming required for a one-shot response
      }
    );
    const audio = await textToSpeech(scenario ?? "");

    handleApiResponse(res, {
      scenario,
      audio
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

  try {
    const scenario = await chatCompletion(
      {
        category,
        lang: lang || "en"
      },
      generateSoundsFishyScenerioChatInstruction,
      {
        ...openAiDefaultConfig,
        temperature: 0.9, // Balanced creativity
        max_completion_tokens: 200, // Set a reasonable max tokens for scenario length
        n: 1, // Generate one completion
        stream: false // No streaming required for a one-shot response
      }
    );
    // parse JSON format from scenario data
    const scenarioObj: SoundsFishyScenerio = JSON.parse(String(scenario));
    // call text to speech in parallel for question, answer, and reference, then send them to handleApiResponse
    const audios = await Promise.all([
      textToSpeech(scenarioObj.question),
      textToSpeech(scenarioObj.answer),
      textToSpeech(scenarioObj.reference)
    ]);
    console.log("🚀 ~ postGenerateSoundsFishyScenario ~ audio:", audios);
    console.log("🚀 ~ postGenerateSoundsFishyScenario ~ scenarioObj:", scenarioObj);

    handleApiResponse(res, {
      scenario,
      questionAudio: audios[0],
      answerAudio: audios[1],
      referenceAudio: audios[2]
    });
  } catch (error) {
    handleError(res, error);
  }
}

export {
  postGenerateFeelinksScenario,
  postGenerateSoundsFishyScenario
};
