import React from "react";
import { Routes, Route } from "react-router-dom";

import ChatRoom from "./components/ChatRoom";
import HomePage from "./components/HomePage";
import { ContextWrapper } from "./ContextWrapper";
export default function App() {

    return (
        <ContextWrapper>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/r/:roomId" element={<ChatRoom />} />
                </Routes>
          
        </ContextWrapper>
    );
}
