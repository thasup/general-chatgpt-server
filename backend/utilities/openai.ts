import dotenv from "dotenv";
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage, type CreateChatCompletionRequest, type CreateCompletionRequest } from "openai";

import { defaultChatInstruction, defaultTextInstruction } from "../models/openai.model";
import { type InputObject } from "../types/openai";
import { OPENAI_MODEL } from "../types/common";

dotenv.config();
const { OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const openAiConfig = {
  max_tokens: 500,
  temperature: 0.5,
  top_p: 0.5
};

const createPrompt = <T>(input: T, instruction?: (input: T) => any): any => {
  if (instruction) {
    return instruction(input);
  }
  switch (typeof input) {
    case "string":
      return defaultTextInstruction(input as string);
    case "object":
      return defaultChatInstruction(input as InputObject);
    default:
      return null;
  }
};

const textCompletion = async (
  inputObj: InputObject,
  instruction?: (inputObj: InputObject) => string,
  options?: Partial<CreateCompletionRequest>
): Promise<string | undefined> => {
  const completion = await openai.createCompletion({
    prompt: createPrompt(inputObj, instruction),
    model: OPENAI_MODEL.GPT_4O_MINI,
    max_tokens: options?.max_tokens ?? 100,
    temperature: options?.temperature ?? 0,
    top_p: options?.top_p ?? 1
  });
  const res = completion?.data?.choices[0]?.text;

  return res;
};

const chatCompletion = async (
  inputObj: InputObject,
  instruction?: (inputObj: InputObject) => ChatCompletionRequestMessage[],
  options?: Partial<CreateChatCompletionRequest>
): Promise<string | undefined> => {
  const completion = await openai.createChatCompletion(
    {
      model: OPENAI_MODEL.GPT_4O_MINI,
      messages: createPrompt(inputObj, instruction),
      max_tokens: options?.max_tokens ?? 100,
      temperature: options?.temperature ?? 0,
      top_p: options?.top_p ?? 1
    }
  );
  const res = completion?.data?.choices[0]?.message?.content;

  return res;
};

export {
  openAiConfig,
  createPrompt,
  textCompletion,
  chatCompletion
};
