const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

var creators = {};

io.on("connection", (socket) => {
  
    socket.on('message', (message, room) => {
        console.log('message received on server...'+message);
        if(socket.id != creators[room]) {
            console.log('message sending to instructor');
            io.to(creators[room]).emit('message', message, socket.id);
        } else {
            console.log('message sending to students');
            socket.to(room).emit('message', message);
        }
    });

    socket.on('on/off stream', (message, room) => {
        socket.to(room).emit('message', message);
    })

    socket.on('create', (room) => {
        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        console.log('no of clients: ' + numClients);
        console.log('intructor creating room: ' + room);
        socket.join(room);
        creators[room] = socket.id;
        console.log(creators)
        io.to(socket.id).emit('created');
    });

    socket.on('join', (room) => {
        console.log('student joining room: ' + room);
        socket.join(room);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(4001, () => console.log('WebRTC Signaling Server Started on port 4001...'));