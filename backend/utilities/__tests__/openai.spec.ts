import { type CreateCompletionRequest, type ChatCompletionRequestMessage } from "openai";

import { defaultChatInstruction, defaultTextInstruction } from "../../models/openai.model";
import { type InputObject } from "../../types/openai";
import { createPrompt, textCompletion } from "../openai";

describe("createPrompt", () => {
  test("should generate correct prompt with text instruction and string input", () => {
    const stringInput = "Test string input";
    const textInstruction = (input: string): string => {
      return input.toUpperCase();
    };
    expect(createPrompt(stringInput, textInstruction)).toBe(
      "TEST STRING INPUT"
    );
  });

  test("should generate correct prompt with chat instruction and object input", () => {
    const objectInput = { message: "Test object input" };
    const chatInstruction = (
      inputObj: InputObject
    ): ChatCompletionRequestMessage[] => {
      const { message } = inputObj;
      return [
        {
          role: "system",
          content: "You're a helpful chatbot"
        },
        {
          role: "user",
          content: `${message}`
        }
      ];
    };
    const expectedInput: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: "You're a helpful chatbot"
      },
      {
        role: "user",
        content: "Test object input"
      }
    ];

    expect(createPrompt(objectInput, chatInstruction)).toStrictEqual(
      expectedInput
    );
  });

  test("should generate correct prompt with default text instruction and string input", () => {
    const stringInput = "Test string input";

    expect(createPrompt(stringInput)).toBe(
      defaultTextInstruction(stringInput)
    );
  });

  test("should generate correct prompt with default chat instruction and object input", () => {
    const objectInput = { message: "Test object input" };
    expect(createPrompt(objectInput)).toStrictEqual(
      defaultChatInstruction(objectInput)
    );
  });
});
