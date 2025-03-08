import { jest } from "@jest/globals";
import type OpenAI from "openai";
import { type InputObject } from "../../types/openai";
import { colorsPaletteChatInstruction2 } from "../../models/colors-palette.model";
import { generateFeelinksScenerioChatInstruction } from "../../models/stack-connect.model";
import { mangaComparatorChatInstruction } from "../../models/manga-comparator.model";
import { Readable } from "stream";

// Set up environment variables for testing
process.env.NODE_ENV = "test";
process.env.PORT = "3000";
process.env.OPENAI_API_KEY = "test-api-key";

// Create mock functions
const mockCreate = jest.fn();
const mockCreateSpeech = jest.fn();

// Mock the OpenAI module
jest.doMock("openai", () => ({
  __esModule: true,
  default: function () {
    return {
      chat: {
        completions: {
          create: mockCreate
        }
      },
      audio: {
        speech: {
          create: mockCreateSpeech
        }
      }
    };
  }
}));

// Import after mocking
const { chatCompletion, textToSpeech } = require("../openai");

// Mock responses
const mockResponse = {
  id: "test-id",
  choices: [
    {
      message: {
        content: JSON.stringify({
          colors: [
            { code: "#FF5733", name: "Sunset Orange" }
          ]
        }),
        role: "assistant"
      },
      index: 0,
      finish_reason: "stop"
    }
  ],
  created: 123,
  model: "gpt-3.5-turbo",
  object: "chat.completion",
  usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
};

const mockAudioResponse = {
  body: Readable.from(Buffer.from("test audio"))
};

beforeEach(() => {
  jest.clearAllMocks();
  mockCreate.mockImplementation(async () => mockResponse);
  mockCreateSpeech.mockImplementation(async () => mockAudioResponse);
});

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

describe("OpenAI Utilities", () => {
  describe("Chat Instructions", () => {
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

  describe("chatCompletion", () => {
    it("should return chat completion response", async () => {
      const result = await chatCompletion(
        { userInput: "Generate a sunset-themed color palette" },
        colorsPaletteChatInstruction2
      );

      expect(result).toBeDefined();
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it("should handle API error", async () => {
      // @ts-expect-error - TODO: Fix OpenAI types in a separate PR
      mockCreate.mockRejectedValueOnce(new Error("API Error"));

      await expect(chatCompletion(
        { userInput: "Generate a color palette" },
        colorsPaletteChatInstruction2
      )).rejects.toThrow("API Error");
    });

    test("should handle empty response", async () => {
      // @ts-expect-error - TODO: Fix OpenAI types in a separate PR
      mockCreate.mockResolvedValue({
        choices: []
      });

      const result = await chatCompletion(
        { input: "test" },
        colorsPaletteChatInstruction2,
        { temperature: 0.8 }
      );

      expect(result).toBeNull();
    });
  });

  describe("textToSpeech", () => {
    it("should return audio buffer", async () => {
      const result = await textToSpeech("Hello world");
      expect(result).toBeDefined();
      expect(mockCreateSpeech).toHaveBeenCalledTimes(1);
    });

    it("should handle API error", async () => {
      // @ts-expect-error - TODO: Fix OpenAI types in a separate PR
      mockCreateSpeech.mockRejectedValueOnce(new Error("API Error"));

      await expect(textToSpeech("Hello world")).rejects.toThrow("API Error");
    });

    test("should handle empty input", async () => {
      await expect(textToSpeech("")).rejects.toThrow();
    });
  });

  describe("Response Format Validation", () => {
    test("should validate color palette response format", async () => {
      // @ts-expect-error - TODO: Fix OpenAI types in a separate PR
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify({
                colors: [
                  { code: "#FF5733", name: "Sunset Orange" },
                  { code: "#33FF57", name: "Spring Green" }
                ]
              })
            }
          }
        ]
      });

      const result = await chatCompletion(
        { input: "sunset and spring" },
        colorsPaletteChatInstruction2,
        { temperature: 0.8 }
      );

      const parsedResult = result ? JSON.parse(result) : null;
      expect(parsedResult).toMatchObject({
        colors: expect.arrayContaining([
          expect.objectContaining({
            code: expect.stringMatching(/^#[0-9A-Fa-f]{6}$/),
            name: expect.any(String)
          })
        ])
      });
    });
  });
});
