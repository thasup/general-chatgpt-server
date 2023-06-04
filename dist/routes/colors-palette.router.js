"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_palette_controller_1 = require("../controllers/colors-palette.controller");
const router = express_1.default.Router();
// Middlewares
router.use((req, res, next) => {
    next();
});
router.get("/", colors_palette_controller_1.getSomething);
router.get("/:input", colors_palette_controller_1.getColorsPalette);
router.post("/text", colors_palette_controller_1.postColorsPaletteTextCompletion);
router.post("/chat", colors_palette_controller_1.postColorsPaletteChatCompletion);
exports.default = router;
//# sourceMappingURL=colors-palette.router.js.map