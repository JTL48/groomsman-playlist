import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";

const SongResults = ({ searchQuery, authToken, onSongSelect }) => {
    const [searchResults, setSongResults] = useState([]);

    useEffect(() => {
        if (!authToken || !searchQuery) return;

        const searchSpotify = async () => {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=10`,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            const data = await response.json();
            setSongResults(data.tracks?.items || []);
        };

        searchSpotify();
    }, [searchQuery, authToken]);

    return (
        <div>
            {searchResults.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {searchResults.map((track) => (
                        <TrackCard key={track.id} track={track} onClick={() => onSongSelect(track)} />
                    ))}
                </div>
            ) : (
                <p>No songs found</p>
            )}
        </div>
    );
};

export default SongResults;
