import express, { type Request, type Response } from "express";

import {
  testSpotifyPlaylist,
  getSpotifyPlaylist,
  postSpotifyPlaylistTextCompletion,
  postSpotifyPlaylistChatCompletion
} from "../controllers/spotify-playlist.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

router.get("/", testSpotifyPlaylist);
router.get("/:input", getSpotifyPlaylist);
router.post("/", postSpotifyPlaylistTextCompletion);
router.post("/", postSpotifyPlaylistChatCompletion);

export default router;
