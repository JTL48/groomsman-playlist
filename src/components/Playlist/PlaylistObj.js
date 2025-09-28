import { track } from "motion/react-client";
import TrackCard from "../AddMemory/TrackCard";

const PlaylistObj = ({ tracks, selectRef, currentTrack, handleTrackChange }) => (
    <div>
        {tracks.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {console.log(tracks)}
                {tracks.map((track) => (
                    <div>
                        {console.log(track)}
                        <TrackCard key={track.track.id} track={track.track} onClick={() => handleTrackChange({ target: { value: track.track.id } })} />
                    </div>
                ))}
            </div>
        ) : (
            <p>No playlist found.</p>
        )}
    </div>
);

export default PlaylistObj;
