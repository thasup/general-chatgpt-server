import { type ChatCompletionRequestMessage } from "openai";

const colorsPaletteTextInstruction = (input: string): string => {
  return `
    Color Palette Generator

    Generate color palettes that match the given theme, mood, or instructions.

    Instructions:
    - Avoid duplicating colors within the same palette.
    - Keep the palette size between 2 to 8 colors.
    - Keep strictly response in the desired format.
    - Avoid producing a very dull color palette.

    Example Usage:
    - Instruction: Generate a color palette for a Google brand.
    - Output:"["#4285f4", "#34a853", "#fbbc05", "#ea4335"], ["Google Blue", "Google Green", "Google Yellow", "Google Red"]"

    - Instruction: Generate a color palette for ocean pastels color palette.
    - Output:"["#83ADFC", "#53CBED", "#22D9DB", "#14D59C", "#0EC36F", "#2EAC8D", "#2A8FBC"], ["Sky Blue", "Light Blue", "Turquoise", "Mint Green", "Emerald Green", "Teal", "Navy Blue"]"

    Desired Response Format:"["#color1", "#color2", ...], ["name1", "name2", ...]"

    Instruction: Generate a color palette for ${input}

    Result:
  `;
};

const colorsPaletteChatInstruction = (input: string): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: "You're Color Palette Generator. You'll generate color palettes that match the given theme, mood, or instructions. You'll avoid duplicating colors and names within the same palette. You'll keep the palette size between 2 to 8 colors."
    },
    {
      role: "user",
      content: "Generate a color palette for a Google brand."
    },
    {
      role: "assistant",
      content: "[\"#4285f4\", \"#34a853\", \"#fbbc05\", \"#ea4335\"], [\"Google Blue\", \"Google Green\", \"Google Yellow\", \"Google Red\"]"
    },
    {
      role: "user",
      content: "Generate a color palette for foresta."
    },
    {
      role: "assistant",
      content: "[\"#3F5F6D\", \"#2F4F4F\", \"#1B4F5F\", \"#006633\", \"#009933\", \"#33CC33\", \"#00CC00\"], [\"Midnight Blue\", \"Dark Slate Gray\", \"Dark Turquoise\", \"Forest Green\", \"Jungle Green\", \"Lime Green\", \"Green\"]"
    },
    {
      role: "user",
      content: `Generate a color palette for ${input}`
    }
  ];
};

export {
  colorsPaletteTextInstruction,
  colorsPaletteChatInstruction
};
