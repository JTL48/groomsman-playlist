import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "./TokenContext";

const Callback = () => {
    const [, setAuthToken] = useAuthToken(); // Access the token setter from context
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the token only if it hasn't been extracted already
        const processToken = () => {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const authToken = hashParams.get("access_token");

            if (authToken) {
                setAuthToken(authToken); // Save token to context
                window.location.hash = ""; // Clear the hash to prevent reprocessing
                navigate("/memory", { replace: true }); // Redirect to Memory
            } else {
                console.error("No access token found");
                navigate("/tokenerror", { replace: true }); // Redirect to an error page if token is missing
            }
        };

        // Guard against multiple calls
        if (window.location.hash.includes("access_token")) {
            processToken();
        }
    }, [setAuthToken, navigate]);

    return (
        <div>
            <h2>Authorizing...</h2>
            <p>Please wait while we authenticate you with Spotify...</p>
        </div>
    );
};

export default Callback;
