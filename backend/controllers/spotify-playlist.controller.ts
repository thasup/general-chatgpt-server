import { type Request, type Response } from "express";

import { chatCompletion } from "../utilities/openai";
import { spotifyPlaylistChatInstruction } from "../models/spotify-playlist.model";



function getSpotifyPlaylist (req: Request, res: Response): void {
  res.send("Hello! This is Spotify playlist generator API :D");
}

async function postSpotifyPlaylistChatCompletion (req: Request, res: Response): Promise<void> {
  const { text, count } = req.body;
  const spotifyInput = {
    text,
    count
  };

  if (!spotifyInput) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      spotifyInput,
      spotifyPlaylistChatInstruction,
      {
        max_tokens: 600,
        temperature: 0.3,
        top_p: 0
      }
    );

    res.status(200).json(palette);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

async function postSpotifyPlaylistChatCompletion (req: Request, res: Response): Promise<void> {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      input,
      "",
      {
        max_tokens: 500,
        temperature: 0.5,
        top_p: 0.5
      }
    );

    res.status(200).json(palette);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

export {
  testSpotifyPlaylist,
  getSpotifyPlaylist,
  postSpotifyPlaylistTextCompletion,
  postSpotifyPlaylistChatCompletion
};
