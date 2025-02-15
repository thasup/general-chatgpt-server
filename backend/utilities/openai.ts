import dotenv from "dotenv";
import OpenAI from "openai";
// import fs from "fs";
// import path from "path";
// import { Readable } from "stream";

import { type InputObject } from "../types/openai";
import { OPENAI_MODEL } from "../types/common";
import { type ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { type ResponseFormatJSONObject, type ResponseFormatJSONSchema, type ResponseFormatText } from "openai/resources";
import { streamToBuffer } from "./common";

dotenv.config();
const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

const openAiDefaultConfig = {
  max_completion_tokens: 100,
  temperature: 0,
  top_p: 1
};

const chatCompletion = async (
  inputObj: InputObject,
  instruction: (inputObj: InputObject) => OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  options?: Partial<ChatCompletionCreateParamsBase>,
  format?: ResponseFormatJSONSchema | ResponseFormatText | ResponseFormatJSONObject | undefined
): Promise<string | null> => {
  const completion = await openai.chat.completions.create(
    {
      model: OPENAI_MODEL.GPT_4O_MINI,
      messages: instruction(inputObj),
      response_format: format,
      max_completion_tokens: options?.max_completion_tokens ?? openAiDefaultConfig.max_completion_tokens,
      temperature: options?.temperature ?? openAiDefaultConfig.temperature,
      top_p: options?.top_p ?? openAiDefaultConfig.top_p
    }
  );
  const res = completion?.choices[0]?.message?.content;

  return res;
};

const textToSpeech = async (text: string): Promise<string> => {
  // const speechFile = path.resolve("./speech.mp3");
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: text,
    response_format: "mp3", // Return audio in MP3 format
    speed: 1
  });
  // const buffer = Buffer.from(await mp3.arrayBuffer());
  // await fs.promises.writeFile(speechFile, buffer);

  const audioStream = mp3.body;
  const audioBuffer = await streamToBuffer(audioStream);
  return audioBuffer.toString("base64");
};

export {
  openAiDefaultConfig,
  chatCompletion,
  textToSpeech
};
