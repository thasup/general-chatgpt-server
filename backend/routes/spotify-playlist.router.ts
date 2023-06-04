import express, { type Request, type Response } from "express";

import {
  getSpotifyPlaylist,
  postSpotifyPlaylistChatCompletion
} from "../controllers/spotify-playlist.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

router.get("/", getSpotifyPlaylist);
router.post("/", postSpotifyPlaylistChatCompletion);

export default router;
