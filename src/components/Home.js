import React from "react";
import { AUTH_URL } from "../tokens/spotifyAuthorizationApi"; // Import the authorization URL from spotifyApi.js
import Header from "./Header";

const Home = () => (
    <div>
        <Header />
        <div style={{ textAlign: "center" }}>
            <h2>
                You made it! You've been selected to be a groomsman at Jacob and Rebecca's wedding.
            </h2>
        </div>
    </div>
);

export default Home;
