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
    const [selectedSong, setSelectedSong] = useState(null);

    const handleSearchChange = (query) => setSearchQuery(query);

    const handleSongSelect = (song) => {
        setSelectedSong(song);
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
                            onSongSelect={handleSongSelect}
                        />
                    </div>
                    <div style={{ flex: 1}}>
                        <SelectedSongInfo
                            selectedSong={selectedSong}
                            authToken={authToken}
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
