"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postColorsPaletteChatCompletion = exports.postColorsPaletteTextCompletion = exports.getColorsPalette = exports.getSomething = void 0;
const openai_1 = require("../utilities/openai");
const colors_palette_model_1 = require("../models/colors-palette.model");
function getSomething(req, res) {
    res.send("Hello! This is colors palette generator API :D");
}
exports.getSomething = getSomething;
async function getColorsPalette(req, res) {
    const input = req.params.input;
    console.log({ input });
    if (!input) {
        res.status(404).json({
            error: "Missing an input"
        });
    }
    try {
        const palette = await (0, openai_1.textCompletion)(input, colors_palette_model_1.colorsPaletteTextInstruction, {
            max_tokens: 500,
            temperature: 0.5,
            top_p: 0.5
        });
        console.log({ palette });
        res.status(200).json(palette);
    }
    catch {
        res.status(500).json({
            error: "Something went wrong!"
        });
    }
}
exports.getColorsPalette = getColorsPalette;
async function postColorsPaletteTextCompletion(req, res) {
    const { input } = req.body;
    console.log({ input });
    if (!input) {
        res.status(400).json({
            error: "Missing an input"
        });
    }
    try {
        const palette = await (0, openai_1.textCompletion)(input, colors_palette_model_1.colorsPaletteTextInstruction, {
            max_tokens: 500,
            temperature: 0.5,
            top_p: 0.5
        });
        console.log({ palette });
        res.status(200).json(palette);
    }
    catch {
        res.status(500).json({
            error: "Something went wrong!"
        });
    }
}
exports.postColorsPaletteTextCompletion = postColorsPaletteTextCompletion;
async function postColorsPaletteChatCompletion(req, res) {
    const { input } = req.body;
    console.log({ input });
    if (!input) {
        res.status(400).json({
            error: "Missing an input"
        });
    }
    try {
        const palette = await (0, openai_1.chatCompletion)(input, colors_palette_model_1.colorsPaletteChatInstruction2, {
            max_tokens: 500,
            temperature: 0.5,
            top_p: 0.5
        });
        console.log({ palette });
        res.status(200).json(palette);
    }
    catch {
        res.status(500).json({
            error: "Something went wrong!"
        });
    }
}
exports.postColorsPaletteChatCompletion = postColorsPaletteChatCompletion;
//# sourceMappingURL=colors-palette.controller.js.map