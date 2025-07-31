import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Create the context
const UserContext = createContext();

// Custom hook to access the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const ProtectedRoute = ({ children }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}
