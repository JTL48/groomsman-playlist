import React, { useState, useEffect } from "react";
import { AUTH_URL } from "../../tokens/spotifyAuthorizationApi";
import Header from "../Header";
import SongSearch from "./SongSearch";
import SongResults from "./SongResults";
import SelectedSongInfo from "./SelectedSongInfo";
import { useAuthToken } from "../../tokens/TokenContext";

const Memory = () => {
    const [authToken] = useAuthToken();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSongResults] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [alreadyInPlaylist, setAlreadyInPlaylist] = useState(false);

    const handleSearchChange = (query) => setSearchQuery(query);

    const handleSongSelect = (song) => {
        setSelectedSong(song);
        setAlreadyInPlaylist(false);
        checkIfSongInPlaylist(song);
    };

    const handleAddToPlaylist = async () => {
        if (!selectedSong || alreadyInPlaylist) return;

        const playlistId = "2RJyA0nTh20hAK2zbSiZON";
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uris: [selectedSong.uri] }),
            }
        );

        if (response.ok) {
            console.log("Song added to playlist!");
            setAlreadyInPlaylist(true);
        } else {
            console.error("Failed to add song to playlist");
        }
    };

    const checkIfSongInPlaylist = async (song) => {
        if (!song) return;

        const playlistId = "2RJyA0nTh20hAK2zbSiZON";
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = await response.json();
        if (data.tracks?.items) {
            const isInPlaylist = data.tracks.items.some((track) => track.track.uri === song.uri);
            setAlreadyInPlaylist(isInPlaylist);
        }
    };

    return (
        <div>
            <Header />
            {authToken ? (
                <div style={{ display: "flex", padding: "20px" }}>
                    <div style={{ flex: 1, paddingRight: "20px" }}>
                        <SongSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                        <SongResults
                            searchQuery={searchQuery}
                            authToken={authToken}
                            searchResults={searchResults}
                            setSongResults={setSongResults}
                            onSongSelect={handleSongSelect}
                        />
                    </div>
                    <div style={{ flex: 1}}>
                        <SelectedSongInfo
                            selectedSong={selectedSong}
                            alreadyInPlaylist={alreadyInPlaylist}
                            onAddToPlaylist={handleAddToPlaylist}
                        />
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <p>To get started, log in with your Spotify account:</p>
                    <a href={AUTH_URL}>
                        <button style={{ padding: "10px 20px", fontSize: "16px" }}>Login with Spotify</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Memory;
