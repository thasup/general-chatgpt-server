import { mockCreate, mockResponse } from "./setup";
import { type InputObject } from "../../types/openai";
import { type ChatCompletionMessageParam } from "openai/resources/chat";

// Import after mocking
let chatCompletion: any;
jest.isolateModules(async () => {
  const openai = await import("../openai");
  chatCompletion = openai.chatCompletion;
});

// Mock instruction function
const mockInstruction = (inputObj: InputObject): ChatCompletionMessageParam[] => {
  return [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Generate colors based on: " + JSON.stringify(inputObj) }
  ];
};

describe("chatCompletion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockImplementation(async () => mockResponse);
  });

  it("should return chat completion response", async () => {
    const result = await chatCompletion({
      inputObj: { userInput: "Generate a sunset-themed color palette" },
      instruction: mockInstruction
    });

    expect(result).toBeDefined();
    expect(mockCreate).toHaveBeenCalledTimes(1);
  }, 10000);

  it("should handle API error", async () => {
    // @ts-expect-error - Mock rejection doesn't need exact type
    mockCreate.mockRejectedValueOnce(new Error("API Error"));

    await expect(chatCompletion({
      inputObj: { userInput: "Generate a color palette" },
      instruction: mockInstruction
    })).rejects.toThrow("API Error");
  });

  test("should handle empty response", async () => {
    // @ts-expect-error - Mock response doesn't need to match exact OpenAI types
    mockCreate.mockResolvedValueOnce({
      id: "test-id",
      choices: [],
      created: 123,
      model: "gpt-3.5-turbo",
      object: "chat.completion"
    });

    const result = await chatCompletion({
      inputObj: { input: "test" },
      instruction: mockInstruction,
      options: { temperature: 0.8 }
    });

    expect(result).toBeUndefined();
  });

  test("should validate color palette response format", async () => {
    // @ts-expect-error - Mock response doesn't need to match exact OpenAI types
    mockCreate.mockResolvedValueOnce({
      id: "test-id",
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
      ],
      created: 123,
      model: "gpt-3.5-turbo",
      object: "chat.completion"
    });

    const result = await chatCompletion({
      inputObj: { input: "sunset and spring" },
      instruction: mockInstruction,
      options: { temperature: 0.8 }
    });

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
