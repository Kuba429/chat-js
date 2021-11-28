const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;
const { Server } = require("socket.io");

app.use(express.static("static"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
});

const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
        socket.removeAllListeners();
    });

    socket.on("join", (data) => {
        socket.join(data);
    });
    socket.on("sendMessage", (data) => {
        io.to(data.roomId).emit("receiveMessage", data.message);
    });
});
