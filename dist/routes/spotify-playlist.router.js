"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotify_playlist_controller_1 = require("../controllers/spotify-playlist.controller");
const router = express_1.default.Router();
// Middlewares
router.use((req, res, next) => {
    next();
});
router.get("/", spotify_playlist_controller_1.getSpotifyPlaylist);
router.get("/login", spotify_playlist_controller_1.loginSpotify);
router.get("/callback", spotify_playlist_controller_1.getCallBack);
router.get("/refresh-token", spotify_playlist_controller_1.getRefreshToken);
router.post("/", spotify_playlist_controller_1.postSpotifyPlaylistChatCompletion);
exports.default = router;
//# sourceMappingURL=spotify-playlist.router.js.map