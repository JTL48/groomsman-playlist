import { SPOTIFY_CONFIG } from "../config/config";

const app_url = process.env.REACT_APP_URL;

const CLIENT_ID = SPOTIFY_CONFIG.CLIENT_ID; // Replace with your Spotify app's Client ID
const REDIRECT_URI = app_url + "/callback"; // Spotify redirect URI
const SCOPES = "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";

// Spotify Authorization URL
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
