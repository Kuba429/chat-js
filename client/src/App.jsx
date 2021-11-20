import React from "react";
import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";

export default function App() {
    const socket = io();
    socket.on("connect", () => {
        console.log(socket.id);
    });

    return (
        <div>
            <h1>App</h1>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
            </Routes>
        </div>
    );
}
