const express = require("express");
const app = express();
const PORT = 5000;
const { Server } = require("socket.io");

app.use(express.static("static"));

const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
