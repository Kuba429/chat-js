import { io } from "socket.io-client";

const SERVER = import.meta.env.VITE_PROXY_WS_SERVER;
// const SERVER = "ws://localhost:5001";

const socket = io(SERVER, {
    origins: "*",
    transports: ["websocket"],
});

export default socket;
