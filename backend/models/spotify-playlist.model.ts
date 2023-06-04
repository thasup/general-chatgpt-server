import { type ChatCompletionRequestMessage } from "openai";

import { type InputObject } from "../types/openai";

const spotifyPlaylistChatInstruction = (spotifyInput: InputObject): ChatCompletionRequestMessage[] => {
  const { text, count = 7 } = spotifyInput;
  return [
    {
      role: "system",
      content: `
        You're a helpful playlist generating assistant.s
        You should generate a list of songs and their artists according to a text prompt.
        You should return a JSON array, where each element follows this format:
        {"song": <song_title>, "artist": <artist_name>}
        `
    },
    {
      role: "user",
      content: "Generate a playlist of 10 songs based on this prompt: super super sad songs"
    },
    {
      role: "assistant",
      content: `
        [
            {"song": "Everybody Hurts", "artist": "R.E.M."},
            {"song": "Nothing Compares 2 U", "artist": "Sinead O'Connor"},
            {"song": "Tears in Heaven", "artist": "Eric Clapton"},
            {"song": "Hurt", "artist": "Johnny Cash"},
            {"song": "My Heart Will Go On", "artist": "Celine Dion"},
            {"song": "Yesterday", "artist": "The Beatles"},
            {"song": "All I Want", "artist": "Kodaline"},
            {"song": "Someone Like You", "artist": "Adele"},
            {"song": "The Sound of Silence", "artist": "Simon & Garfunkel"},
            {"song": "How to Save a Life", "artist": "The Fray"}
        ]`
    },
    {
      role: "user",
      content: `Generate a playlist of ${count} songs based on this prompt: ${text}`
    }
  ];
};

export {
  spotifyPlaylistChatInstruction
};
