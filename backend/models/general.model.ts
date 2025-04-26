import type OpenAI from "openai";
import { type InputObject } from "@/types/openai";

const fixSpellingAndGrammarTextInstruction = (inputObj: InputObject): string => {
  return `
    Correct any spelling, syntax, or grammar mistakes in the text delimited by triple quotes without making any improvements or changes to the original meaning or style.
    In other words, only correct spelling, syntax, or grammar mistakes, do not make improvements.
    If the original text has no mistake, just output the original text and nothing else.
    Do not wrap responses in quotes. """ ${inputObj.input as string} """
  `;
};

const fixSpellingAndGrammarChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Correct any spelling, syntax, or grammar mistakes in the text delimited by triple quotes without making any improvements or changes to the original meaning or style.
        In other words, only correct spelling, syntax, or grammar mistakes, do not make improvements.
        If the original text has no mistake, just output the original text and nothing else.
        Do not wrap responses in quotes.
      `
    },
    {
      role: "user",
      content: `Input: """ ${inputObj.input as string} """`
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
    Respond in the ${inputObj.lang as string} language. """ ${inputObj.input as string} """
  `;
};

const summarizeChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        You are a highly skilled AI trained in language comprehension and summarization.
        I would like you to read the text delimited by triple quotes and summarize it into a concise abstract paragraph.
        Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text.
        Please avoid unnecessary details or tangential points.
        Only give me the output and nothing else.
        Do not wrap responses in quotes.
        Respond in the ${String(inputObj.lang as string)} language.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const rewriteChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Rewrite the following text, which will be delimited by triple quotes, to be more concise and well-written while preserving the original meaning.
        Provide only the rewritten text as your output, without any quotes or tags.
        Respond in the same language as the original text.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const explainChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Please explain clearly and concisely in ${inputObj.lang as string} language.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const translateChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        You are a highly skilled AI trained in language translation.
        I would like you to translate the text delimited by triple quotes into ${inputObj.lang as string} language.
        Only give me the output and nothing else.
        Do not wrap responses in quotes.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const brainstormChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Please generate 10 creative ideas based on the following keywords or topics.
        Each idea should be unique and provide a fresh perspective.
        Output the ideas in the form of an unordered list.
        Only give me the output and nothing else.
        The outline should be in the ${inputObj.lang as string} language.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const outlineChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Please use the following topics or keywords to generate an outline that includes titles, chapters, and subsections.
        Output it in Markdown format.
        Only give me the output and nothing else.
        The outline should be in the ${inputObj.lang as string} language.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const writeBlogChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Help me generate a blog post based on the following topics or keywords.
        Follow the steps below:
          - Step 1: Generate a catchy blog title for me;
          - Step 2: Generate blog content, including an attractive beginning, content described in chapters, and conclusion;
          - Step 3: Organize content according to the format of general blogs, output in markdown format;
        Do not return anything other than the blog post.
        Do not include step information.
        Do not wrap responses in quotes.
        Respond in the ${inputObj.lang as string} language.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const shorterChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Please rewrite the text input to be no more than half the number of characters while keeping the core meaning the same.
        Output only the rewritten text, without any quotes or other formatting.
        Write the rewritten text in the same language as the original text.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

const longerChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        Please rewrite the text input to be twice as long, while keeping the core meaning the same.
        Do not add any completely new information, ideas or opinions.
        Output the rewritten, expanded text directly, without any quotes or other formatting.
        Write in the same language as the original text.
      `
    },
    {
      role: "user",
      content: `Input: """ ${String(inputObj.input as string)} """`
    }
  ];
};

export {
  fixSpellingAndGrammarTextInstruction,
  fixSpellingAndGrammarChatInstruction,
  summarizeTextInstruction,
  summarizeChatInstruction,
  rewriteChatInstruction,
  explainChatInstruction,
  translateChatInstruction,
  brainstormChatInstruction,
  outlineChatInstruction,
  writeBlogChatInstruction,
  shorterChatInstruction,
  longerChatInstruction
};
