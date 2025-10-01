import { useState, useEffect } from "react";
import { SPOTIFY_CONFIG} from "../../config/config";
import { useUser } from "../userContext";
import { Button } from "react-bootstrap";

const api_url = process.env.REACT_APP_API_URL;

const SelectedSongInfo = ({ selectedSong, authToken }) => {
    const [alreadyInPlaylist, setAlreadyInPlaylist] = useState(false);
    const [memoryDescription, setMemoryDescription] = useState("");
    const { user } = useUser();

    // Check if the song is already in the playlist when selectedSong changes
    useEffect(() => {
        if (selectedSong) {
            checkIfSongInPlaylist(selectedSong);
        }
    }, [selectedSong]);

    const checkIfSongInPlaylist = async (song) => {
        if (!song) return;

        const playlistId = SPOTIFY_CONFIG.PLAYLIST_ID;
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

    const handleDescriptionChange = (event) => {
        setMemoryDescription(event.target.value);
    };

    const handleAddButtonClick = () => {
        if (memoryDescription) {
            handleAddToPlaylist(memoryDescription);
        }
    };

    const handleAddToPlaylist = async (memoryDescription) => {
        if (!selectedSong || alreadyInPlaylist) return;

        const playlistId = SPOTIFY_CONFIG.PLAYLIST_ID;
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

        // Send song and memory description to the backend (MongoDB)
        try {
            const memoryResponse = await fetch(api_url + "/api/add-memory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    songID: selectedSong.id,
                    memoryDescription: memoryDescription,
                    username: user.username
                }),
            });

            const memoryData = await memoryResponse.json();
            if (memoryData.message === "Memory added successfully") {
                console.log("Memory added to MongoDB");
            }
        } catch (error) {
            console.error("Error adding memory to MongoDB:", error);
        }
        
    };
    
    return (
        <div style={{ textAlign: "center" }}>
            {selectedSong ? (
                <>
                    <h4>Selected Song: {selectedSong.name}</h4>
                    {alreadyInPlaylist ? (
                        <p>Song is in the playlist</p>
                    ) : (
                        <div>
                            <textarea
                                placeholder="Enter your memory"
                                value={memoryDescription}
                                onChange={handleDescriptionChange}
                                style={{ width: "100%", height: "100px", marginBottom: "10px" }}
                            />
                            <Button variant="primary" onClick={handleAddButtonClick} disabled={!memoryDescription}>Add to Playlist</Button>
                        </div>
                    )}
                </>
            ) : (
                <p>Select a song to see details</p>
            )}
        </div>
    );
};

export default SelectedSongInfo;
