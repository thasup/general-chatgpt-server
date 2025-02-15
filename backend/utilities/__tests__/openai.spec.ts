import type OpenAI from "openai";

import { type InputObject } from "../../types/openai";

describe("createPrompt", () => {
  test("should generate correct prompt with chat instruction and object input", () => {
    const objectInput = { message: "Test object input" };
    const chatInstruction = (
      inputObj: InputObject
    ): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
      const { message } = inputObj;
      return [
        {
          role: "developer",
          content: "You're a helpful chatbot"
        },
        {
          role: "user",
          content: `${message}`
        }
      ];
    };
    const expectedInput: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "developer",
        content: "You're a helpful chatbot"
      },
      {
        role: "user",
        content: "Test object input"
      }
    ];

    expect(chatInstruction(objectInput)).toStrictEqual(
      expectedInput
    );
  });
});
