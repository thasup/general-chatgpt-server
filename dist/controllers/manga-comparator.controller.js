"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postManga = exports.getManga = void 0;
const openai_1 = require("../utilities/openai");
const manga_comparator_model_1 = require("../models/manga-comparator.model");
function getManga(req, res) {
    res.send("Hello! This is manga comparator API :D");
}
exports.getManga = getManga;
async function postManga(req, res) {
    const { char1, char2, manga1, manga2 } = req.body;
    const mangaInput = {
        char1,
        char2,
        manga1,
        manga2
    };
    console.log({ mangaInput });
    if (!mangaInput) {
        res.status(400).json({
            error: "Missing an input for manga comparator"
        });
    }
    try {
        const charactor = await (0, openai_1.chatCompletion)(mangaInput, manga_comparator_model_1.mangaComparatorChatInstruction, {
            max_tokens: 300,
            temperature: 0,
            top_p: 1
        });
        console.log({ charactor });
        res.status(200).json(charactor);
    }
    catch {
        res.status(500).json({
            error: "Something went wrong!"
        });
    }
}
exports.postManga = postManga;
//# sourceMappingURL=manga-comparator.controller.js.map