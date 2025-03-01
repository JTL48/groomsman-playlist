const SpotifyEmbed = ({ playlistId }) => (
    <div style={{ flex: 1 }}>
        <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
            width="100%"
            height="800"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
    </div>
);

export default SpotifyEmbed;
