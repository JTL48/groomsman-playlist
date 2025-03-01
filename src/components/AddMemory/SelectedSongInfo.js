const SelectedSongInfo = ({ selectedSong, alreadyInPlaylist, onAddToPlaylist }) => (
    <div style={{ textAlign: "center" }}>
        {selectedSong ? (
            <>
                <h4>Selected Song: {selectedSong.name}</h4>
                {alreadyInPlaylist ? (
                    <p>Song is already in the playlist</p>
                ) : (
                    <button onClick={onAddToPlaylist}>Add to Playlist</button>
                )}
            </>
        ) : (
            <p>Select a song to see details</p>
        )}
    </div>
);

export default SelectedSongInfo;
