import { mockCreateSpeech, mockAudioResponse } from "./setup";

// Import after mocking
let textToSpeech: any;
jest.isolateModules(async () => {
  const openai = await import("../openai");
  textToSpeech = openai.textToSpeech;
});

describe("textToSpeech", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateSpeech.mockImplementation(async () => mockAudioResponse);
  });

  it("should return audio buffer", async () => {
    const result = await textToSpeech("Hello world");
    expect(result).toBeDefined();
    expect(mockCreateSpeech).toHaveBeenCalledTimes(1);
  });

  it("should handle API error", async () => {
    // @ts-expect-error - Mock rejection doesn't need exact type
    mockCreateSpeech.mockRejectedValueOnce(new Error("API Error"));

    await expect(textToSpeech("Hello world")).rejects.toThrow("API Error");
  });

  test("should handle empty input", async () => {
    // @ts-expect-error - Mock rejection doesn't need exact type
    mockCreateSpeech.mockRejectedValueOnce(new Error("String should have at least 1 character"));

    await expect(textToSpeech("")).rejects.toThrow("String should have at least 1 character");
  }, 10000);
});
