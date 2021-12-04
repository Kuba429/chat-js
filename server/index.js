const express = require("express");
const app = express();
const PORT = 5000;
const { Server } = require("socket.io");

const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
    const getOnlineInRoom = (roomId) => {
        return io.sockets.adapter.rooms?.get(roomId)?.size;
    };
    console.log("user connected");

    socket.on("disconnect", () => {
        io.to(socket.customRoom).emit(
            "onlineStatus",
            getOnlineInRoom(socket.customRoom)
        );
        socket.removeAllListeners();
    });

    socket.on("join", (data) => {
        socket.join(data);
        socket.customRoom = data;
        io.to(data).emit("onlineStatus", getOnlineInRoom(data));
    });

    socket.on("sendMessage", (data) => {
        io.to(data.roomId).emit("receiveMessage", data.message);
    });

    socket.on("checkOnline", (roomId) => {
        socket.emit("onlineStatus", getOnlineInRoom(roomId));
    });
});
