import type OpenAI from "openai";
import { type InputObject } from "../../types/openai";
import { colorsPaletteChatInstruction2 } from "../../models/colors-palette.model";
import { generateFeelinksScenerioChatInstruction } from "../../models/stack-connect.model";
import { mangaComparatorChatInstruction } from "../../models/manga-comparator.model";

describe("Chat Instructions", () => {
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

    expect(chatInstruction(objectInput)).toStrictEqual(expectedInput);
  });

  test("should generate correct prompt for color palette", () => {
    const input = { input: "sunset colors" };
    const messages = colorsPaletteChatInstruction2(input);

    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: expect.any(String),
          content: expect.stringContaining(input.input)
        })
      ])
    );
  });

  test("should generate correct prompt for Feelinks scenario", () => {
    const input = { category: "family" };
    const messages = generateFeelinksScenerioChatInstruction(input);

    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: expect.any(String),
          content: expect.stringContaining(input.category)
        })
      ])
    );
  });

  test("should generate correct prompt for manga comparison", () => {
    const input = {
      char1: "Luffy",
      char2: "Naruto",
      manga1: "One Piece",
      manga2: "Naruto"
    };
    const messages = mangaComparatorChatInstruction(input);

    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: expect.any(String),
          content: expect.stringMatching(new RegExp(input.char1))
        })
      ])
    );
  });
});
