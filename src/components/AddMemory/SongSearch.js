const SongSearch = ({ searchQuery, onSearchChange }) => (
    <div style={{ textAlign: "center", marginBottom: "20px", marginRight: "25px" }}>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for a song to add..."
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "8px" }}
        />
    </div>
);

export default SongSearch;
