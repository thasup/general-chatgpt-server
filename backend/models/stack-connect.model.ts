import { type ChatCompletionRequestMessage } from "openai";
import { type InputObject } from "../types/openai";

const generateScenerioChatInstruction = (inputObj: InputObject): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: `
        You are a scenario generator for the board game Feelinks.
        Your task is to create a compelling, emotionally engaging scenario that feels authentic to the game. Each scenario should be:
        - Short (no longer than one sentence).
        - Thought-provoking, encouraging different emotional responses.
        - Relatable and realistic—avoid overly dramatic or extreme situations.
        - Open-ended to allow for diverse interpretations.
        The scenario must fit into one of four categories: Family, Friend, School, or Social.
        Each scenario should be generated randomly and must not repeat.
      `
    },
    {
      role: "user",
      content: "Category: Family"
    },
    {
      role: "assistant",
      content: "Your parents surprise you with a gift, but it’s something you don’t like."
    },
    {
      role: "user",
      content: "Category: Friend"
    },
    {
      role: "assistant",
      content: "A friend cancels plans at the last minute without explanation."
    },
    {
      role: "user",
      content: "Category: School"
    },
    {
      role: "assistant",
      content: "Your teacher reads your essay aloud in class as an example of good work."
    },
    {
      role: "user",
      content: "Category: Social"
    },
    {
      role: "assistant",
      content: "A stranger compliments you on something you didn’t expect to be noticed."
    },
    {
      role: "user",
      content: `Category: ${inputObj.category}`
    }
  ];
};

export {
  generateScenerioChatInstruction
};
