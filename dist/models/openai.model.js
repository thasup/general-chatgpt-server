"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChatInstruction = exports.defaultTextInstruction = void 0;
const defaultTextInstruction = (input) => {
    return input;
};
exports.defaultTextInstruction = defaultTextInstruction;
const defaultChatInstruction = (inputObj) => {
    return [
        {
            role: "system",
            content: "You're a helpful chatbot"
        },
        {
            role: "user",
            content: inputObj.text
        }
    ];
};
exports.defaultChatInstruction = defaultChatInstruction;
//# sourceMappingURL=openai.model.js.map