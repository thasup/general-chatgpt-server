import dotenv from "dotenv";
import OpenAI from "openai";
import {
  type ResponseFormatJSONObject,
  type ResponseFormatJSONSchema,
  type ResponseFormatText
} from "openai/resources";

import { type InputObject } from "@/types/openai";
import { DEEPSEEK_MODEL, GEMINI_MODEL, OPENAI_MODEL } from "@/types/common";
import { type ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { streamToBuffer } from "@/utilities/common";

dotenv.config();
const { API_KEY, BASE_URL, OPENAI_API_KEY } = process.env;

const openRouter = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL ?? "https://openrouter.ai/api/v1"
});

const openAi = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const openAiDefaultConfig = {
  max_completion_tokens: 100,
  temperature: 0.7,
  top_p: 1
};

interface ChatCompletionParams {
  inputObj: InputObject;
  instruction: (inputObj: InputObject) => OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  options?: Partial<ChatCompletionCreateParamsBase>;
  format?: ResponseFormatJSONSchema | ResponseFormatText | ResponseFormatJSONObject;
  model?: OPENAI_MODEL | GEMINI_MODEL | DEEPSEEK_MODEL;
}

const chatCompletion = async ({
  inputObj,
  instruction,
  options,
  format,
  model
}: ChatCompletionParams): Promise<string | null> => {
  let parsedCompletion: any = null;
  let completion: OpenAI.Chat.Completions.ChatCompletion | null = null;
  if (format) {
    parsedCompletion = await openRouter.beta.chat.completions.parse({
      model: model ?? OPENAI_MODEL.GPT_4O_MINI,
      messages: instruction(inputObj),
      response_format: format,
      max_completion_tokens:
        options?.max_completion_tokens ?? openAiDefaultConfig.max_completion_tokens,
      temperature: options?.temperature ?? openAiDefaultConfig.temperature,
      top_p: options?.top_p ?? openAiDefaultConfig.top_p
    });
  } else {
    completion = await openRouter.chat.completions.create({
      model: model ?? GEMINI_MODEL.GEMMA_3_1B_FREE,
      messages: instruction(inputObj),
      max_completion_tokens:
        options?.max_completion_tokens ?? openAiDefaultConfig.max_completion_tokens,
      temperature: options?.temperature ?? openAiDefaultConfig.temperature,
      top_p: options?.top_p ?? openAiDefaultConfig.top_p
    });
  }

  if (format) {
    const res = parsedCompletion?.choices?.[0]?.message?.content || null;
    return res;
  }
  const res = completion?.choices[0]?.message?.content || null;
  return res;
};

const textToSpeech = async (text: string): Promise<string> => {
  // const speechFile = path.resolve("./speech.mp3");
  const mp3 = await openAi.audio.speech.create({
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

export { openAiDefaultConfig, chatCompletion, textToSpeech };
