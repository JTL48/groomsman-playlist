import { useState, useEffect, memo } from "react";

const TrackDetails = ({ currentTrack }) => {
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        if (!currentTrack?.song) return;

        const getMemory = async () => {
            // Get song and memory description from the backend (MongoDB)
            try {
                console.log("Current Track ID: ", currentTrack?.song?.id)

                const response = await fetch(`http://localhost:5000/api/getMemory/${currentTrack.song.id}`);
                const data = await response.json();

                if (response.ok) {
                    setMemory(data);
                    console.log("Current Memory: ", memory)
                } else {
                    setMemory(null);
                }
            } catch (error) {
                console.error("Error getting memory from MongoDB:", error);
            }
            
        };

        getMemory();
    }, [currentTrack]);

    return (
        <>
            <h2>Song Info</h2>
            {currentTrack ? (
                <div>
                    <img
                        src={currentTrack.song.album.images[0].url}
                        alt="Album Art"
                        style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                    />
                    <p><strong>Song:</strong> {currentTrack.song.name}</p>
                    <p><strong>Artist(s):</strong> {currentTrack.song.artists.map(artist => artist.name).join(", ")}</p>
                    <p><strong>Album:</strong> {currentTrack.song.album.name}</p>
                    {memory ? (
                        <div>
                            <p style={{
                                backgroundColor: "#e0e0e0", // Light gray bubble
                                padding: "10px 15px",
                                borderRadius: "15px",
                                maxWidth: "60%", // Adjust width as needed
                                wordWrap: "break-word",
                                textAlign: "left",
                                display: "inline-block",
                            }}>
                                {memory.memoryDescription}
                            </p>
                            <p><small>{new Date(memory.dateCreated).toLocaleString("en-US", {
                                month: "numeric",
                                day: "numeric",
                                year: "2-digit", // Shortened year format
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true, // Ensures AM/PM format
                            })}</small></p>
                        </div> 
                    ) : (
                        <p>No memory added for this song.</p>
                    )}
                </div>
            ) : (
                <p>Select a song from the dropdown to see details.</p>
            )}
        </>
    );
}

export default TrackDetails;
