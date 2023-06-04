"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manga_comparator_controller_1 = require("../controllers/manga-comparator.controller");
const router = express_1.default.Router();
// Middlewares
router.use((req, res, next) => {
    next();
});
router.get("/", manga_comparator_controller_1.getManga);
router.post("/", manga_comparator_controller_1.postManga);
exports.default = router;
//# sourceMappingURL=manga-comparator.router.js.map