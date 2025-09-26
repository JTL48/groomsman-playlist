import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './userContext'

const Header = () => {
    const { user, logout } = useUser();

    return (
        <div style={{ padding: "10px", backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
            <nav>
                <Link to="/" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                    Home
                </Link>
                {user ? (
                    <>
                        <Link to="/playlist" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                            Playlist
                        </Link>
                        <Link to="/memory" style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}>
                            Memory
                        </Link>
                    </>
                ) : (
                    <div></div>
                )}
            </nav>

            {/* Right side: sign out button */}
            {user && (
                <button
                    onClick={logout}
                    style={{
                        backgroundColor: "transparent",
                        border: "1px solid #fff",
                        color: "#fff",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Sign Out
                </button>
            )}
        </div>
    );
};

export default Header;