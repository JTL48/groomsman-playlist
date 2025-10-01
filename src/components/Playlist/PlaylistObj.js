import { track } from "motion/react-client";
import TrackCard from "../AddMemory/TrackCard";

const PlaylistObj = ({ tracks, selectRef, currentTrack, handleTrackChange }) => (
    <div>
        {tracks.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {tracks.map((track) => (
                    <TrackCard key={track.track.id} track={track.track} onClick={() => handleTrackChange({ target: { value: track.track.id } })} />
                ))}
            </div>
        ) : (
            <p>No playlist found.</p>
        )}
    </div>
);

export default PlaylistObj;
