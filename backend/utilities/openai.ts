import dotenv from "dotenv";
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage, type CreateChatCompletionRequest, type CreateCompletionRequest } from "openai";

import { defaultChatInstruction, defaultTextInstruction } from "../models/openai.model";
import { type InputObject } from "../types/openai";

dotenv.config();
const { OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const createPrompt = <T>(input: T, instruction?: (input: T) => string | ChatCompletionRequestMessage[]): any => {
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
  input: string,
  instruction?: (input: string) => string,
  options?: Partial<CreateCompletionRequest>
): Promise<string | undefined> => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: createPrompt(input, instruction),
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
      model: "gpt-3.5-turbo",
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
  textCompletion,
  chatCompletion
};
