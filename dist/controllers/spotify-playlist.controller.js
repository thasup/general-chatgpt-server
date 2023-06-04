"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSpotifyPlaylistChatCompletion = exports.getSpotifyPlaylist = exports.getRefreshToken = exports.getCallBack = exports.loginSpotify = void 0;
const querystring_1 = __importDefault(require("querystring"));
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = require("../utilities/openai");
const spotify_playlist_model_1 = require("../models/spotify-playlist.model");
const spotify_1 = require("../utilities/spotify");
dotenv_1.default.config();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const redirectUri = "http://localhost:9999";
const stateKey = "spotify_auth_state";
// const scopes = ["user-read-private", "user-read-email"];
// const state = "some-state-of-my-choice";
function getSpotifyPlaylist(req, res) {
    res.send("Hello! This is Spotify playlist generator API :D");
}
exports.getSpotifyPlaylist = getSpotifyPlaylist;
async function postSpotifyPlaylistChatCompletion(req, res) {
    const { text, count } = req.body;
    const spotifyInput = {
        text,
        count
    };
    console.log({ spotifyInput });
    if (!spotifyInput) {
        res.status(400).json({
            error: "Missing an input"
        });
    }
    try {
        const palette = await (0, openai_1.chatCompletion)(spotifyInput, spotify_playlist_model_1.spotifyPlaylistChatInstruction, {
            max_tokens: 600,
            temperature: 0.3,
            top_p: 0
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
exports.postSpotifyPlaylistChatCompletion = postSpotifyPlaylistChatCompletion;
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
function loginSpotify(req, res) {
    const state = (0, spotify_1.generateRandomString)(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    const scope = "user-read-private user-read-email";
    const baseUrl = "https://accounts.spotify.com/authorize?";
    const appendUrl = querystring_1.default.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri: redirectUri,
        state
    });
    const redirectUrl = baseUrl + appendUrl;
    console.log({ redirectUrl });
    res.redirect(redirectUrl);
}
exports.loginSpotify = loginSpotify;
;
function getCallBack(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code ?? null;
    const state = req.query.state ?? null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect("/#" +
            querystring_1.default.stringify({
                error: "state_mismatch"
            }));
    }
    else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code,
                redirect_uri: redirectUri,
                grant_type: "authorization_code"
            },
            headers: {
                Authorization: "Basic " + (Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"))
            },
            json: true
        };
        request_1.default.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const accessToken = body.access_token;
                const refreshToken = body.refresh_token;
                const options = {
                    url: "https://api.spotify.com/v1/me",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    json: true
                };
                // use the access token to access the Spotify Web API
                request_1.default.get(options, function (error, response, body) {
                    console.log(body);
                    if (error) {
                        console.log({ error });
                    }
                });
                // we can also pass the token to the browser to make requests from there
                res.redirect("/#" +
                    querystring_1.default.stringify({
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }));
            }
            else {
                res.redirect("/#" +
                    querystring_1.default.stringify({
                        error: "invalid_token"
                    }));
            }
        });
    }
}
exports.getCallBack = getCallBack;
;
function getRefreshToken(req, res) {
    // requesting access token from refresh token
    const refreshToken = req.query.refresh_token;
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: { Authorization: "Basic " + (Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")) },
        form: {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        },
        json: true
    };
    request_1.default.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const accessToken = body.access_token;
            res.send({
                access_token: accessToken
            });
        }
    });
}
exports.getRefreshToken = getRefreshToken;
;
//# sourceMappingURL=spotify-playlist.controller.js.map