import React, { useState } from "react";
import Header from "./Header";
import { useUser } from './userContext'
import { Link } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

const Home = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { user, login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(api_url + "/api/login", {
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
        <h1 style={{ textAlign: "center"}} >🎉 Welcome to Jacob's Bachelor Party Playlist 🎉</h1>
        {user ? (
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <h2>Hello {user.display}</h2>
                <h3>
                    I've put together a little interactive website all revolving around one of my favorite things in the world: Music! (Behind Beckers of course) 💍<br />
                    A lot of you, I've met through the love of music! 🥁 So I felt this would be very fitting for this group! 🎸<br />
                    I made a playlist full of songs that remind me of each one of you. With each song, there's a memory. Feel free to reply and add to the conversation!<br />
                    If you have any songs that remind you of me (or anyone else in the group), there's the "Memory" tab where you can add songs to the playlist along with a description.<br />
                    The hope is, by the time we go on our bachelor trip, we'll have a crazy playlist of songs that we can party to at the cabin and reminisce about our journey together!<br />
                    If you're accessing this website, I want to thank you for being a lifelong friend! I wouldn't be where I am today without you all. Love y'all! ❤️
                </h3>
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
