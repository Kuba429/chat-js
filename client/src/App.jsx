import React from "react";
import { io } from "socket.io-client";
export default function App() {
    const socket = io();
    socket.on("connect", () => {
        console.log(socket.id);
    });

    return (
        <div>
            <h1>App</h1>
        </div>
    );
}
