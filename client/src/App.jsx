import React from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import ChatRoom from "./components/ChatRoom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import { ContextWrapper } from "./ContextWrapper";
export default function App() {
    const socket = io("ws://localhost:5000");

    return (
        <ContextWrapper>
            <Navbar/>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:roomId" element={<ChatRoom />} />
                </Routes>
            </div>
        </ContextWrapper>
    );
}
