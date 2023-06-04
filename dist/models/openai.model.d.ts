import { type ChatCompletionRequestMessage } from "openai";
import { type InputObject } from "../types/openai";
declare const defaultTextInstruction: (input: string) => string;
declare const defaultChatInstruction: (inputObj: InputObject) => ChatCompletionRequestMessage[];
export { defaultTextInstruction, defaultChatInstruction };
//# sourceMappingURL=openai.model.d.ts.map