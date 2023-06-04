"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorsPaletteChatInstruction2 = exports.colorsPaletteChatInstruction = exports.colorsPaletteTextInstruction = void 0;
const colorsPaletteTextInstruction = (input) => {
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
exports.colorsPaletteTextInstruction = colorsPaletteTextInstruction;
const colorsPaletteChatInstruction = (inputObj) => {
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
            content: `Generate a color palette for ${inputObj.input}`
        }
    ];
};
exports.colorsPaletteChatInstruction = colorsPaletteChatInstruction;
const colorsPaletteChatInstruction2 = (inputObj) => {
    return [
        {
            role: "system",
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
            content: `Generate a color palette for: ${inputObj.input}`
        }
    ];
};
exports.colorsPaletteChatInstruction2 = colorsPaletteChatInstruction2;
//# sourceMappingURL=colors-palette.model.js.map