import { jest } from "@jest/globals";
import { Readable } from "stream";

// Set up environment variables for testing
process.env.NODE_ENV = "test";
process.env.PORT = "3000";
process.env.API_KEY = "test-api-key";

// Create mock functions
export const mockCreate = jest.fn();
export const mockCreateSpeech = jest.fn();

// Mock responses
export const mockResponse = {
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
} as const;

export const mockAudioResponse = {
  body: Readable.from(Buffer.from("test audio"))
};

// Mock the OpenAI module
jest.mock("openai", () => ({
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
