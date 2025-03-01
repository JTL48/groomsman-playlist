import { useState, useEffect } from "react";

// Spotify API Credentials
const CLIENT_ID = "406768425e1a47b9bc6980251b59e54d"; // Replace with your Client ID
const CLIENT_SECRET = "9f5c6926cce342c781f2447cf87656eb";

// Fetch client access token for public use
export const useClientToken = () => {
    const [clientToken, setClientToken] = useState(null);

    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                const response = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
                    },
                    body: new URLSearchParams({
                        grant_type: "client_credentials",
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setClientToken(data.access_token); // Store the public token
                } else {
                    console.error("Failed to fetch access token");
                }
            } catch (error) {
                console.error("Error fetching access token:", error);
            }
        };

        fetchClientToken();
    }, []);

    return clientToken;
};
