import { type ChatCompletionRequestMessage, type CreateChatCompletionRequest, type CreateCompletionRequest } from "openai";
import { type InputObject } from "../types/openai";
declare const textCompletion: (input: string, instruction?: ((input: string) => string) | undefined, options?: Partial<CreateCompletionRequest>) => Promise<string | undefined>;
declare const chatCompletion: (inputObj: InputObject, instruction?: ((inputObj: InputObject) => ChatCompletionRequestMessage[]) | undefined, options?: Partial<CreateChatCompletionRequest>) => Promise<string | undefined>;
export { textCompletion, chatCompletion };
//# sourceMappingURL=openai.d.ts.map