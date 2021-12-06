import { io } from "socket.io-client";

const SERVER = "ws://chat-ws-api.herokuapp.com/";
// const SERVER = "ws://localhost:5000";

const socket = io(SERVER, {
    origins: "*",
    transports: ["websocket"],
});

export default socket;
