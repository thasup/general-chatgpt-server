import dotenv from "dotenv";
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage, type CreateChatCompletionRequest, type CreateCompletionRequest } from "openai";

import { defaultChatInstruction, defaultTextInstruction } from "../models/default-prompt.model";

dotenv.config();
const { OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// GPT -3
const createPromptForTextCompletion = (input: string, instruction?: (input: string) => string): string => {
  if (instruction) {
    return instruction(input);
  }

  const defaultPrompt = defaultTextInstruction(input);
  return defaultPrompt;
};

const textCompletion = async (
  input: string,
  instruction?: (input: string) => string,
  options?: Partial<CreateCompletionRequest>
): Promise<string | undefined> => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: createPromptForTextCompletion(input, instruction),
    max_tokens: options?.max_tokens ?? 100,
    temperature: options?.temperature ?? 0,
    top_p: options?.top_p ?? 1
  });
  const res = completion?.data?.choices[0]?.text;
  console.log({ res });

  return res;
};

// GPT - 3.5
const createPromptForChatCompletion = (input: string, instruction?: (input: string) => ChatCompletionRequestMessage[]): ChatCompletionRequestMessage[] => {
  if (instruction) {
    return instruction(input);
  }

  const defaultPrompt = defaultChatInstruction(input);
  return defaultPrompt;
};

const chatCompletion = async (
  input: string,
  instruction?: (input: string) => ChatCompletionRequestMessage[],
  options?: Partial<CreateChatCompletionRequest>
): Promise<string | undefined> => {
  const completion = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: createPromptForChatCompletion(input, instruction),
      max_tokens: options?.max_tokens ?? 100,
      temperature: options?.temperature ?? 0,
      top_p: options?.top_p ?? 1
    }
  );
  const res = completion?.data?.choices[0]?.message?.content;
  console.log({ res });

  return res;
};

export {
  textCompletion,
  chatCompletion
};
