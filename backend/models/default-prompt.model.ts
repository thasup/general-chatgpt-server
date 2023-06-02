import { type ChatCompletionRequestMessage } from "openai";

const defaultTextInstruction = (input: string): string => {
  return input;
};

const defaultChatInstruction = (input: string): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: "You're a helpful chatbot"
    },
    {
      role: "user",
      content: input
    }
  ];
};

export {
  defaultTextInstruction,
  defaultChatInstruction
};
