import { type ChatCompletionRequestMessage } from "openai";
import { type InputObject } from "../types/openai";

const generateScenerioChatInstruction = (inputObj: InputObject): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: `
        You are a scenario generator for an ice-breaking game.
        Your task is to create a compelling, emotionally engaging scenario that feels authentic to the game.
        The scenario must fit into one of six categories: Family, Friend, School, Social, Work, or Entertainment.
        Each scenario should be generated randomly and must not repeat.
        Never lead with any emotion clues.
        Add emoji if they feel appropriate.
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
      content: "Category: Work"
    },
    {
      role: "assistant",
      content: "Your boss gives you an unexpected compliment about your work, but you feel it’s not deserved."
    },
    {
      role: "user",
      content: "Category: Entertainment"
    },
    {
      role: "assistant",
      content: "You get lost in a new city and feel both excited and nervous about exploring."
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
