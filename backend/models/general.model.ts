import { type ChatCompletionRequestMessage } from "openai";
import { type InputObject } from "../types/openai";

const fixSpellingAndGrammarTextInstruction = (inputObj: InputObject): string => {
  return `
    Correct any spelling, syntax, or grammar mistakes in the text delimited by triple quotes without making any improvements or changes to the original meaning or style.
    In other words, only correct spelling, syntax, or grammar mistakes, do not make improvements.
    If the original text has no mistake, just output the original text and nothing else.
    Do not wrap responses in quotes. """ ${inputObj.input} """
  `;
};

const fixSpellingAndGrammarChatInstruction = (inputObj: InputObject): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: `
        Correct any spelling, syntax, or grammar mistakes in the text delimited by triple quotes without making any improvements or changes to the original meaning or style.
        In other words, only correct spelling, syntax, or grammar mistakes, do not make improvements.
        If the original text has no mistake, just output the original text and nothing else.
        Do not wrap responses in quotes.
        `
    },
    {
      role: "user",
      content: `Input: """ ${inputObj.input} """`
    }
  ];
};

const summarizeTextInstruction = (inputObj: InputObject): string => {
  return `
    You are a highly skilled AI trained in language comprehension and summarization.
    I would like you to read the text delimited by triple quotes and summarize it into a concise abstract paragraph.
    Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text.
    Please avoid unnecessary details or tangential points.
    Only give me the output and nothing else.
    Do not wrap responses in quotes.
    Respond in the ${inputObj.lang} language. """ ${inputObj.input} """
  `;
};

const summarizeChatInstruction = (inputObj: InputObject): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: `
        You are a highly skilled AI trained in language comprehension and summarization.
        I would like you to read the text delimited by triple quotes and summarize it into a concise abstract paragraph.
        Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text.
        Please avoid unnecessary details or tangential points.
        Only give me the output and nothing else.
        Do not wrap responses in quotes.
        Respond in the ${String(inputObj.lang)} language.
        `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input)} """`
    }
  ];
};

export {
  fixSpellingAndGrammarTextInstruction,
  fixSpellingAndGrammarChatInstruction,
  summarizeTextInstruction,
  summarizeChatInstruction
};
