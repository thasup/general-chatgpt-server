"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const scopes = ["user-read-private", "user-read-email"];
const redirectUri = "http://localhost:9999";
const state = "some-state-of-my-choice";
// credentials are optional
const spotifyApi = new spotify_web_api_node_1.default({
    clientId: SPOTIFY_CLIENT_ID,
    redirectUri
});
// const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
// console.log({ authorizeURL });
// const spotifyApi = new SpotifyWebApi({
//   clientId: SPOTIFY_CLIENT_ID,
//   clientSecret: SPOTIFY_CLIENT_SECRET,
//   redirectUri: redirectUri
// });
// The code that's returned as a query parameter to the redirect URI
const code = "AQBBEnGlqKxM-kvbHb0lpkwp_V_B5v-vCTEXOBzPA1aLDRzl43ZLGS-8toit1CR7Gj8R4BIAXckDqf9WPVMmmEJjeVseOr1QxqMxiCf2iRKbE2pZcQjdzSZS2b1jBgrSk6UxmmzompB6d5B8JaT9JXQBQU7hV5tRlt3tKMhW1KVHMn8f9zULofR9EWoQx_EdVN0ctdmhk1RGV011LA&state=mXwcGkxtkskO4PNq";
// Retrieve an access token and a refresh token
// spotifyApi.authorizationCodeGrant(code).then(
//   function (data) {
//     console.log(`The token expires in ${data.body.expires_in}`);
//     console.log(`The access token is ${data.body.access_token}`);
//     console.log(`The refresh token is ${data.body.refresh_token}`);
//     // Set the access token on the API object to use it in later calls
//     spotifyApi.setAccessToken(data.body.access_token);
//     spotifyApi.setRefreshToken(data.body.refresh_token);
//   },
//   function (err) {
//     console.log("Something went wrong!", err);
//   }
// );
// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
// spotifyApi.refreshAccessToken().then(
//   function (data) {
//     console.log("The access token has been refreshed!");
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body.access_token);
//   },
//   function (err) {
//     console.log("Could not refresh access token", err);
//   }
// );
// console.log({ spotifyApi });
// spotifyApi.setAccessToken(code);
// // Get Elvis' albums
// spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//   function (data) {
//     console.log("Artist albums", data.body);
//   },
//   function (err) {
//     console.error(err);
//   }
// );
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.generateRandomString = generateRandomString;
//# sourceMappingURL=spotify.js.map