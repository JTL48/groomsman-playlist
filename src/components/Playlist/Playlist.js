import React, { useState, useEffect, useRef } from "react";
import { useClientToken } from "../../tokens/spotifyClientApi";
import Header from "../Header";
import PlaylistObj from "./PlaylistObj";
import TrackControls from "./TrackControls";
import TrackDetails from "./TrackDetails";
import { SPOTIFY_CONFIG } from "../../config/config";
import { Button } from "react-bootstrap";

const Playlist = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const clientToken = useClientToken();
    const selectRef = useRef(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (!clientToken) return;

        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${SPOTIFY_CONFIG.PLAYLIST_ID}`, {
                    headers: { Authorization: `Bearer ${clientToken}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTracks(data.tracks?.items || []);
                } else {
                    console.warn("Failed to fetch playlist");
                }
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        fetchPlaylist();
    }, [clientToken]);

    const handleTrackChange = (event) => {
        const trackId = event.target.value;
        const selectedTrack = tracks.find(track => track.track.id === trackId);

        if (selectedTrack) {
            setCurrentTrack({
                song: selectedTrack.track,
                index: tracks.findIndex(track => track.track.id === trackId),
            });
        }

        setShowDetails(true);
    };

    const previousTrackChange = () => {
        if (currentTrack && currentTrack.index > 0) {
            const previousTrack = tracks[currentTrack.index - 1];
            selectRef.current.value = previousTrack.track.id;
            handleTrackChange({ target: { value: previousTrack.track.id } });
        }
    };

    const nextTrackChange = () => {
        if (currentTrack && currentTrack.index < tracks.length - 1) {
            const nextTrack = tracks[currentTrack.index + 1];
            selectRef.current.value = nextTrack.track.id;
            handleTrackChange({ target: { value: nextTrack.track.id } });
        }
    };


    return (
        <>
        <Header />
        <div className="playlist-layout">
            {/* Desktop: always two columns */}
            {/* Mobile: conditionally show playlist OR details */}
            {window.innerWidth > 768 ? (
                <>
                <div className="playlist-left">
                    <h1 style={{textAlign: "center"}}>Bachelor Party Playlist</h1>
                    <PlaylistObj
                    tracks={tracks}
                    selectRef={selectRef}
                    currentTrack={currentTrack}
                    handleTrackChange={handleTrackChange}
                    />
                </div>
                <div className="playlist-right">
                    <TrackControls
                        tracks={tracks}
                        selectRef={selectRef}
                        currentTrack={currentTrack}
                        handleTrackChange={handleTrackChange}
                        previousTrackChange={previousTrackChange}
                        nextTrackChange={nextTrackChange}
                    />
                    <TrackDetails currentTrack={currentTrack} />
                </div>
                </>
            ) : (
                <>
                {!showDetails ? (
                    <div>
                        <h1 style={{textAlign: "center"}}>Bachelor Party Playlist</h1>
                        <PlaylistObj
                            tracks={tracks}
                            selectRef={selectRef}
                            currentTrack={currentTrack}
                            handleTrackChange={handleTrackChange}
                        />
                    </div>
                ) : (
                    <div className="playlist-details">
                        <Button variant="primary" onClick={() => setShowDetails(false)}>← Back to Playlist</Button>
                        <TrackControls
                            tracks={tracks}
                            selectRef={selectRef}
                            currentTrack={currentTrack}
                            handleTrackChange={handleTrackChange}
                            previousTrackChange={previousTrackChange}
                            nextTrackChange={nextTrackChange}
                        />
                        <TrackDetails currentTrack={currentTrack} />
                    </div>
                )}
                </>
            )}
            </div>

        </>

    );
};

export default Playlist;
