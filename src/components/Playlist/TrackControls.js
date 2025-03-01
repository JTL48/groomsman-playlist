import { Row, Col } from 'react-bootstrap';

const TrackControls = ({ tracks, selectRef, currentTrack, handleTrackChange, previousTrackChange, nextTrackChange }) => (
    <>
        <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
            <Col style={{ flex: "none" }}>
                <button onClick={previousTrackChange}>Previous</button>
            </Col>
            <Col style={{ flex: "none" }}>
                <select onChange={handleTrackChange} ref={selectRef} defaultValue="">
                    <option value="" disabled>Select a song</option>
                    {tracks.map(trackItem => (
                        <option key={trackItem.track.id} value={trackItem.track.id}>
                            {trackItem.track.name} - {trackItem.track.artists.map(artist => artist.name).join(", ")}
                        </option>
                    ))}
                </select>
            </Col>
            <Col style={{ flex: "none" }}>
                <button onClick={nextTrackChange}>Next</button>
            </Col>
        </Row>
    </>
);

export default TrackControls;
