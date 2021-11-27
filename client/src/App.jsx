import React from "react";
import { Routes, Route } from "react-router-dom";

import ChatRoom from "./components/ChatRoom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import { ContextWrapper } from "./ContextWrapper";
export default function App() {

    return (
        <ContextWrapper>
            <Navbar/>
       
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:roomId" element={<ChatRoom />} />
                </Routes>
          
        </ContextWrapper>
    );
}
