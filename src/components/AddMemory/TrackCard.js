import ExplicitIcon from "../../assets/Explicit_Icon.jpg";

const TrackCard = ({ track, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
        }}
    >
        <img
            src={track.album.images[0].url}
            alt="Album Art"
            style={{ width: "50px", height: "50px", borderRadius: "8px", marginRight: "10px" }}
        />
        <div>
            <div>{track.name}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
                {track.explicit && <img src={ExplicitIcon} alt="Explicit" style={{ width: "15px", marginRight: "5px" }} />}
                {track.artists.map((artist) => artist.name).join(", ")}
            </div>
        </div>
    </div>
);

export default TrackCard;
