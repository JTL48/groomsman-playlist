const TrackDetails = ({ currentTrack }) => (
    <>
        <h2>Song Info</h2>
        {currentTrack ? (
            <div>
                <img
                    src={currentTrack.imageUrl}
                    alt="Album Art"
                    style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                />
                <p><strong>Song:</strong> {currentTrack.name}</p>
                <p><strong>Artist(s):</strong> {currentTrack.artists}</p>
                <p><strong>Album:</strong> {currentTrack.album}</p>
            </div>
        ) : (
            <p>Select a song from the dropdown to see details.</p>
        )}
    </>
);

export default TrackDetails;
