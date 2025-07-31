import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Playlist from "./components/Playlist/Playlist";
import Callback from "./tokens/Callback";
import AddMemory from "./components/AddMemory/AddMemory";
import { AuthTokenProvider } from "./tokens/TokenContext";
import TokenError from "./tokens/TokenError";
import { ProtectedRoute, UserProvider } from "./components/userContext";

function App() {
  return (
    <AuthTokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>}
          />
          <Route path="/memory" element={
            <ProtectedRoute>
              <AddMemory />
            </ProtectedRoute>}
          />
          <Route path="/callback" element={<Callback />} />
          <Route path="/tokenerror" element={<TokenError />} />
        </Routes>
      </Router>
    </AuthTokenProvider>
  );
}

export default App;
