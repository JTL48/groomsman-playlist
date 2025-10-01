import React, { useState, useEffect } from "react";
import { AUTH_URL } from "../../tokens/spotifyAuthorizationApi";
import Header from "../Header";
import SongSearch from "./SongSearch";
import SongResults from "./SongResults";
import SelectedSongInfo from "./SelectedSongInfo";
import { useAuthToken } from "../../tokens/TokenContext";
import { Button } from "react-bootstrap";

const Memory = () => {
    const [authToken] = useAuthToken();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSong, setSelectedSong] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleSearchChange = (query) => setSearchQuery(query);

    const handleSongSelect = (song) => {
        setSelectedSong(song);
        setShowDetails(true);
    };

    return (
        <div>
            <Header />
            {authToken ? (
                <div className="playlist-layout">
                    {window.innerWidth > 768 ? (
                        <>
                            <div className="playlist-left">
                                <SongSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                                <SongResults
                                    searchQuery={searchQuery}
                                    authToken={authToken}
                                    onSongSelect={handleSongSelect}
                                />
                            </div>
                            <div className="playlist-right">
                                <SelectedSongInfo
                                    selectedSong={selectedSong}
                                    authToken={authToken}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {!showDetails ? (
                                <div>
                                    <SongSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                                    <SongResults
                                        searchQuery={searchQuery}
                                        authToken={authToken}
                                        onSongSelect={handleSongSelect}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Button variant="primary" onClick={() => setShowDetails(false)}>← Back to Song Search</Button>
                                    <SelectedSongInfo
                                        selectedSong={selectedSong}
                                        authToken={authToken}
                                    />
                                </div>
                            )}
                        </>

                    )}
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
