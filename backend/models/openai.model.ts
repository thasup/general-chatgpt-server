import { type ChatCompletionRequestMessage } from "openai";
import { type InputObject } from "../types/openai";

const defaultTextInstruction = (input: string): string => {
  return input;
};

const defaultChatInstruction = (inputObj: InputObject): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: "You're a helpful chatbot"
    },
    {
      role: "user",
      content: inputObj.text as string
    }
  ];
};

export {
  defaultTextInstruction,
  defaultChatInstruction
};
