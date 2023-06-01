import dotenv from "dotenv";
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from "openai";

import { colorsPaletteTextInstruction, colorsPaletteChatInstruction, colorsPaletteChatInstruction2 } from "../models/colors-palette.model";

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
  return colorsPaletteTextInstruction(input);
};

const textCompletion = async (input: string, instruction?: (input: string) => string): Promise<string | undefined> => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: createPromptForTextCompletion(input, instruction),
    max_tokens: 500,
    temperature: 0.7,
    top_p: 0.5
  });
  const res = completion?.data?.choices[0]?.text;

  return res;
};

// GPT - 3.5
const createPromptForChatCompletion = (input: string, instruction?: (input: string) => ChatCompletionRequestMessage[]): ChatCompletionRequestMessage[] => {
  if (instruction) {
    return instruction(input);
  }
  return colorsPaletteChatInstruction2(input);
};

const chatCompletion = async (input: string, instruction?: (input: string) => ChatCompletionRequestMessage[]): Promise<string | undefined> => {
  const completion = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: createPromptForChatCompletion(input, instruction),
      max_tokens: 500,
      temperature: 0.7,
      top_p: 0.5
    }
  );
  const res = completion?.data?.choices[0]?.message?.content;

  return res;
};

export {
  textCompletion,
  chatCompletion
};
