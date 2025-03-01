import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{ padding: "10px", backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
            <nav>
                <Link to="/" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                    Home
                </Link>
                <Link to="/playlist" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                    Playlist
                </Link>
                <Link to="/memory" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                    Memory
                </Link>
            </nav>
        </div>
    );
};

export default Header;