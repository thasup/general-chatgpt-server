"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompletion = exports.textCompletion = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = require("openai");
const openai_model_1 = require("../models/openai.model");
dotenv_1.default.config();
const { OPENAI_API_KEY } = process.env;
const configuration = new openai_1.Configuration({
    apiKey: OPENAI_API_KEY
});
const openai = new openai_1.OpenAIApi(configuration);
const createPrompt = (input, instruction) => {
    if (instruction) {
        return instruction(input);
    }
    switch (typeof input) {
        case "string":
            return (0, openai_model_1.defaultTextInstruction)(input);
        case "object":
            return (0, openai_model_1.defaultChatInstruction)(input);
        default:
            return null;
    }
};
const textCompletion = async (input, instruction, options) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: createPrompt(input, instruction),
        max_tokens: options?.max_tokens ?? 100,
        temperature: options?.temperature ?? 0,
        top_p: options?.top_p ?? 1
    });
    const res = completion?.data?.choices[0]?.text;
    return res;
};
exports.textCompletion = textCompletion;
const chatCompletion = async (inputObj, instruction, options) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: createPrompt(inputObj, instruction),
        max_tokens: options?.max_tokens ?? 100,
        temperature: options?.temperature ?? 0,
        top_p: options?.top_p ?? 1
    });
    const res = completion?.data?.choices[0]?.message?.content;
    return res;
};
exports.chatCompletion = chatCompletion;
//# sourceMappingURL=openai.js.map