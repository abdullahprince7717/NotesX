
const { Server } = require("socket.io");
const http = require('http');

// Initialize Socket.io server
const initSocket = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log('socket connected')
        io.emit("click", "will be received by everyone");
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return { io, server };
};

module.exports = initSocket 