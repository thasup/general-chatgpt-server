import { type ChatCompletionRequestMessage } from "openai";
import { type InputObject } from "../types/openai";
declare const colorsPaletteTextInstruction: (input: string) => string;
declare const colorsPaletteChatInstruction: (inputObj: InputObject) => ChatCompletionRequestMessage[];
declare const colorsPaletteChatInstruction2: (inputObj: InputObject) => ChatCompletionRequestMessage[];
export { colorsPaletteTextInstruction, colorsPaletteChatInstruction, colorsPaletteChatInstruction2 };
//# sourceMappingURL=colors-palette.model.d.ts.map