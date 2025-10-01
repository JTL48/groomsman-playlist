import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './userContext';

const Header = () => {
    const { user, logout } = useUser();

    return (
        <div
            style={{
                padding: "10px 20px",
                backgroundColor: "#333",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // 3 zones
            }}
        >
            {/* Left zone (empty for now, could hold a logo later) */}
            <div style={{ flex: 1, textAlign: "left" }}></div>

            {/* Center zone (nav links stay centered) */}
            <div style={{ flex: 1, textAlign: "center" }}>
                <Link to="/" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                    Home
                </Link>
                {user && (
                    <>
                        <Link to="/playlist" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                            Playlist
                        </Link>
                        <Link to="/memory" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                            Memory
                        </Link>
                    </>
                )}
            </div>

            {/* Right zone (Sign Out button) */}
            <div style={{ flex: 1, textAlign: "right" }}>
                {user && (
                    <button
                        onClick={logout}
                        style={{
                            backgroundColor: "transparent",
                            color: "#fff",
                            padding: "0px 15px",
                            cursor: "pointer",
                            border: "none",
                            fontSize: "10px",
                        }}
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
