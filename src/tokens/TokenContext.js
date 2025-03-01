import React, { createContext, useContext, useState } from "react";

const AuthTokenContext = createContext();

// Custom hook to access the token
export const useAuthToken = () => {
    const context = useContext(AuthTokenContext);
    if (!context) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context; // [token, setToken]
};

// TokenProvider to wrap your app and manage token state
export const AuthTokenProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null); // Store token in state

    return (
        <AuthTokenContext.Provider value={[authToken, setAuthToken]}>
            {children}
        </AuthTokenContext.Provider>
    );
};
