import { mockCreate, mockResponse } from "./setup";
import { colorsPaletteChatInstruction2 } from "../../models/colors-palette.model";

// Import after mocking
let chatCompletion: any;
jest.isolateModules(async () => {
  const openai = await import("../openai");
  chatCompletion = openai.chatCompletion;
});

describe("chatCompletion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockImplementation(async () => mockResponse);
  });

  it("should return chat completion response", async () => {
    const result = await chatCompletion(
      { userInput: "Generate a sunset-themed color palette" },
      colorsPaletteChatInstruction2
    );

    expect(result).toBeDefined();
    expect(mockCreate).toHaveBeenCalledTimes(1);
  }, 10000);

  it("should handle API error", async () => {
    // @ts-expect-error - Mock rejection doesn't need exact type
    mockCreate.mockRejectedValueOnce(new Error("API Error"));

    await expect(chatCompletion(
      { userInput: "Generate a color palette" },
      colorsPaletteChatInstruction2
    )).rejects.toThrow("API Error");
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

    const result = await chatCompletion(
      { input: "test" },
      colorsPaletteChatInstruction2,
      { temperature: 0.8 }
    );

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
