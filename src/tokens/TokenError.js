import React from "react";
import Header from "../components/Header";

const TokenError = () => {
    return (
        <div>
            <Header />
            <h2 style={{ textAlign: "center" }}>Token Not Found</h2>
        </div>
    );
};

export default TokenError;