import type OpenAI from "openai";
import { type InputObject } from "../types/openai";

const colorsPaletteTextInstruction = (inputObj: InputObject): string => {
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

    Instruction: Generate a color palette for ${inputObj.input}

    Result:
  `;
};

const colorsPaletteChatInstruction = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
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
      content: `Generate a color palette for ${inputObj.input as string}`
    }
  ];
};

const colorsPaletteChatInstruction2 = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        You're a colors palette generator assistant who must do your task without adding any comments or notes.
        You'll generate color palettes that match the given theme, mood, or instructions.
        You'll avoid duplicating color code or color name within the same response, but you can generate a new palette even if it is the same input.
        You must keep the palette size between 2 to 8 colors.
        You must return a JSON array, where each element follows this format: {"code": <color_code>, "name": <color_name>}
        If you recieve the same input, try generate a new colors palette again.
        If you recieve an empty input, just ramdomly generate a new beautiful colors palette.
        `
    },
    {
      role: "user",
      content: "Generate a color palette for: ocean breeze"
    },
    {
      role: "assistant",
      content: `
        [
          {"code": "#4ECDC4", "name": "Turquoise"},
          {"code": "#F7FFF7", "name": "Mint Cream"},
          {"code": "#9BC1BC", "name": "Opal"},
          {"code": "#5D5C61", "name": "Slate Gray"}
        ]
        `
    },
    {
      role: "user",
      content: "Generate a color palette for: foresta"
    },
    {
      role: "assistant",
      content: `
        [
          {"code": "#556B2F", "name": "Dark Olive Green"},
          {"code": "#8F9779", "name": "Camouflage Green"},
          {"code": "#BDB76B", "name": "Dark Khaki"},
          {"code": "#FFF8DC", "name": "Cornsilk"}
        ]
        `
    },
    {
      role: "user",
      content: `Generate a color palette for: ${inputObj.input as string}`
    }
  ];
};

const colorsPaletteChatInstruction3 = (inputObj: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        You're Color Palette Generator.
        You'll generate color palettes that match the given theme, mood, or instructions.
        You'll avoid duplicating colors and names within the same palette.
        You'll keep the palette size between 2 to 8 colors.
        You must return a JSON array, where each element follows this format: {"code": <color_code>, "name": <color_name>}
        If you recieve the same input, try generate a new colors palette again.
        `
    },
    {
      role: "user",
      content: "Generate a color palette for: thailand flag"
    },
    {
      role: "assistant",
      content: `
          [
            {
                "code": "#FF0000",
                "name": "Red"
            },
            {
                "code": "#FFFFFF",
                "name": "White"
            },
            {
                "code": "#0072C6",
                "name": "Cerulean Blue"
            }
        ]
        `
    },
    {
      role: "user",
      content: "Generate a color palette for: ocean breeze"
    },
    {
      role: "assistant",
      content: `
          [
            {
                "code": "#6DD3CE",
                "name": "Turquoise Blue"
            },
            {
                "code": "#F5F5F5",
                "name": "White Smoke"
            },
            {
                "code": "#D5E5E5",
                "name": "Light Gray Blue"
            },
            {
                "code": "#BFD7EA",
                "name": "Powder Blue"
            }
        ]
        `
    },
    {
      role: "user",
      content: "Generate a color palette for: night vibrant city"
    },
    {
      role: "assistant",
      content: `
          [
            {
                "code": "#000080",
                "name": "Navy Blue"
            },
            {
                "code": "#FFD700",
                "name": "Gold"
            },
            {
                "code": "#FF1493",
                "name": "Deep Pink"
            },
            {
                "code": "#00FFFF",
                "name": "Cyan"
            },
            {
                "code": "#FF8C00",
                "name": "Dark Orange"
            }
        ]
        `
    },
    {
      role: "user",
      content: `Generate a color palette for: ${inputObj.input as string}`
    }
  ];
};

export {
  colorsPaletteTextInstruction,
  colorsPaletteChatInstruction,
  colorsPaletteChatInstruction2,
  colorsPaletteChatInstruction3
};
