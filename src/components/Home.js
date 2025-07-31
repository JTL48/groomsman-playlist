import React, { useState } from "react";
import Header from "./Header";
import { useUser } from './userContext'
import { Link } from "react-router-dom";

const Home = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { user, login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // You could store user info or a token in localStorage/context here
                console.log("Login successful:", data);
                login(data.user);
                // Redirect or show success message
            } else {
                setLoginError(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("An error occurred during login");
        }
    };

    return (
        <div>
        <Header />
        {user ? (
            <div style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto" }}>
                <h1>Hello {user.display}</h1>
                <h2>
                    You made it to Jacob's Bachelor Playlist! I've put together a little interactive website all revolving around one of my favorite things in the world: Music! (Behind Beckers of course)
                    I made a playlist with a bunch of songs that remind me of each one of you. With each song, there's a memory attached. Feel free to reply and add to it!
                    If you have any songs that remind you of me (or really anyone else in the group), there's also a tab where you can add songs to the playlist along with your memory.
                    The hope is, by the time we go on our bachelor trip, we'll have a crazy playlist of songs that we can party to at the cabin and reminisce about our journey together!
                    You should have recieved a username and password. Login below to continue!
                </h2>
                <Link to="/playlist">
                    <button>
                        Playlist
                    </button>
                </Link>
                
            </div>
        ) : (
            <div style={{ textAlign: "center", maxWidth: "400px", margin: "0 auto" }}>
                <form onSubmit={handleLogin} style={{ marginTop: "30px" }}>
                    <h3>Log In</h3>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: "10px", margin: "10px 0", width: "100%", borderRadius: "6px" }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "10px", margin: "10px 0", width: "100%", borderRadius: "6px" }}
                        required
                    />
                    <button
                        type="submit"
                        style={{ padding: "10px 20px", borderRadius: "6px", fontSize: "16px" }}
                    >
                        Log In
                    </button>

                    {loginError && <p style={{ color: "red", marginTop: "10px" }}>{loginError}</p>}
                </form>
            </div>
        )}
        </div>
    );
};

export default Home;
