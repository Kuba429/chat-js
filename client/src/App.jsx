import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Test from "./components/Test";
import { ContextWrapper } from "./ContextWrapper";
export default function App() {
    const socket = io("ws://localhost:5000");

    return (
        <ContextWrapper>
            <div>
                <h1>App</h1>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </div>
        </ContextWrapper>
    );
}
