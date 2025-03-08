import { SPOTIFY_CONFIG } from "../config/config";

const CLIENT_ID = SPOTIFY_CONFIG.CLIENT_ID; // Replace with your Spotify app's Client ID
const REDIRECT_URI = "http://localhost:3000/callback"; // Spotify redirect URI
const SCOPES = "playlist-modify-public playlist-read-private playlist-read-collaborative";

// Spotify Authorization URL
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
