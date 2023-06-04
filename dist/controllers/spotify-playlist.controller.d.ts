import { type Request, type Response } from "express";
declare function getSpotifyPlaylist(req: Request, res: Response): void;
declare function postSpotifyPlaylistChatCompletion(req: Request, res: Response): Promise<void>;
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
declare function loginSpotify(req: Request, res: Response): void;
declare function getCallBack(req: Request, res: Response): void;
declare function getRefreshToken(req: Request, res: Response): void;
export { loginSpotify, getCallBack, getRefreshToken, getSpotifyPlaylist, postSpotifyPlaylistChatCompletion };
//# sourceMappingURL=spotify-playlist.controller.d.ts.map