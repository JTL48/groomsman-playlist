import { Row, Col, Button, Container, Form } from 'react-bootstrap';


const TrackControls = ({ tracks, selectRef, currentTrack, handleTrackChange, previousTrackChange, nextTrackChange }) => (
    <div className="track-controls" style={{marginBottom: '15px'}}>
        <Button variant="primary" onClick={previousTrackChange}>⏮</Button>
        <Form.Select onChange={handleTrackChange} ref={selectRef} defaultValue="">
            <option value="" disabled>Select a song</option>
            {tracks.map((trackItem) => (
            <option key={trackItem.track.id} value={trackItem.track.id}>
                {trackItem.track.name} - {trackItem.track.artists.map((artist) => artist.name).join(", ")}
            </option>
            ))}
        </Form.Select>
        <Button variant="primary" onClick={nextTrackChange}>⏭</Button>
    </div>

);

export default TrackControls;
