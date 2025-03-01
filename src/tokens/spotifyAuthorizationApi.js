const CLIENT_ID = "406768425e1a47b9bc6980251b59e54d"; // Replace with your Spotify app's Client ID
const REDIRECT_URI = "http://localhost:3000/callback"; // Spotify redirect URI

// Spotify Authorization URL
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=playlist-modify-public`;
