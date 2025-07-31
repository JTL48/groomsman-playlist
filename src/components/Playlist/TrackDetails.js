import { useState, useEffect, memo } from "react";
import { useUser } from "../userContext";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";

const TrackDetails = ({ currentTrack }) => {
    const [memory, setMemory] = useState(null);
    const [replyDescription, setReplyDescription] = useState("");
    const { user } = useUser();

    useEffect(() => {
        if (!currentTrack?.song) return;

        getMemory();
    }, [currentTrack]);

    const getMemory = async () => {
        // Get song and memory description from the backend (MongoDB)
        try {

            const response = await fetch(`http://localhost:5000/api/getMemory/${currentTrack.song.id}`);
            const data = await response.json();
            console.log(data)

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

    const handleDescriptionChange = (event) => {
        setReplyDescription(event.target.value);
    };

    const clearDescription = () => {
        setReplyDescription("")
    };

    const handleAddButtonClick = () => {
        if (replyDescription) {
            handleAddMemoryReply(replyDescription);
        }
    };

    const handleAddMemoryReply = async (replyDescription) => {
            if (!currentTrack.song) return;
    
            // Send song and memory description to the backend (MongoDB)
            try {
                const replyResponse = await fetch("http://localhost:5000/api/add-reply", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        songID: currentTrack.song.id,
                        replyDescription: replyDescription,
                        username: user.username,
                    }),
                });
    
                const replyData = await replyResponse.json();
                if (replyData.message === "Reply added successfully") {
                    console.log("Memory added to MongoDB");
                    await getMemory();
                    await clearDescription();
                }
            } catch (error) {
                console.error("Error adding memory to MongoDB:", error);
            }
        };

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
                        memory.entries.map((entry, index) => {
                        
                        const previousEntry = memory.entries[index - 1];
                        const isSameUser = previousEntry && previousEntry.display === entry.display
                            
                        return (
                            <div>
                                {entry.username === user.username ? (
                                    <div key={index} style={{ marginBottom: "10px", textAlign: "right" }}>
                                        {!isSameUser && (
                                            <div><small style={{
                                            display: "inline-block",
                                            fontSize: "11px",
                                            color: "#888",
                                            textAlign: "right",
                                            maxWidth: "60%"
                                            }}>
                                                {entry.display}
                                            </small></div>
                                        )}
                                        
                                        <p style={{
                                            backgroundColor: "#007aff", // imessage blue
                                            color: "white",
                                            padding: "10px 15px",
                                            borderRadius: "15px",
                                            maxWidth: "60%", // Adjust width as needed
                                            wordWrap: "break-word",
                                            textAlign: "left",
                                            display: "inline-block",
                                            margin: "0px"
                                        }}>
                                            {entry.text}
                                        </p>
                                        <div><small style={{
                                            display: "inline-block",
                                            fontSize: "11px",
                                            color: "#888",
                                            textAlign: "right",
                                            maxWidth: "60%"
                                        }}>
                                        {new Date(entry.date).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric", // Shortened year format
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true, // Ensures AM/PM format
                                        })}</small></div>
                                    </div>
                                ) : (
                                    <div key={index} style={{ marginBottom: "10px", textAlign: "left" }}>
                                        {!isSameUser && (
                                                <div><small style={{
                                                display: "inline-block",
                                                fontSize: "11px",
                                                color: "#888",
                                                textAlign: "right",
                                                maxWidth: "60%"
                                            }}>
                                                {entry.display}
                                            </small></div>
                                        )}
                                        <p style={{
                                            backgroundColor: "#e0e0e0", // Light gray bubble
                                            padding: "10px 15px",
                                            borderRadius: "15px",
                                            maxWidth: "60%", // Adjust width as needed
                                            wordWrap: "break-word",
                                            textAlign: "left",
                                            display: "inline-block",
                                            margin: "0px"
                                        }}>
                                            {entry.text}
                                        </p>
                                        <div><small style={{
                                            display: "inline-block",
                                            fontSize: "11px",
                                            color: "#888",
                                            textAlign: "right",
                                            maxWidth: "60%"
                                        }}>
                                        {new Date(entry.date).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric", // Shortened year format
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true, // Ensures AM/PM format
                                        })}</small></div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                    ) : (
                        <p>No memory added for this song.</p>
                    )}
                    <p>
                        <textarea
                            placeholder="Reply to the Memory!"
                            value={replyDescription}
                            onChange={handleDescriptionChange}
                            style={{ width: "100%", height: "100px", marginBottom: "10px" }}
                        />
                    </p>
                    <button 
                        onClick={handleAddButtonClick} 
                        disabled={!replyDescription} // Disable if description is empty
                    >
                        Send Reply
                    </button>
                </div>
            ) : (
                <p>Select a song from the dropdown to see details.</p>
            )}
        </>
    );
}

export default TrackDetails;
