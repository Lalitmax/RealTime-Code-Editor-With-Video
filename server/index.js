const express = require('express');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config()
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const roomsName = new Map();
let chatSave = new Map();
const port = process.env.PORT || 3002;
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Create or join a room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);

        // Initialize the room with an empty array if it doesn't exist
        if (!roomsName.has(roomName)) {
            roomsName.set(roomName, []);
            chatSave.set(roomName, "");
        }

        // Add the socket ID to the array of the room
        roomsName.get(roomName).push(socket.id);
        console.log(`Socket ${socket.id} joined room ${roomName}`);
        
        // Send the chat history of the room to the newly joined socket
        io.to(socket.id).emit("newJoin", chatSave.get(roomName));
    });

    // Handle chat messages
    socket.on("chat", (payload) => {

         console.log(payload)
         const roomNameClient = payload.roomName;

        // Ensure the room exists in the chatSave Map
        if (!chatSave.has(roomNameClient)) {
            chatSave.set(roomNameClient, "");
        }

        // Add the chat message to the chat history for the room
        chatSave.set(roomNameClient ,payload.chat);

        const roomsNameArray = roomsName.get(roomNameClient);
         if (roomsNameArray) {
            roomsNameArray.forEach(socketId => {
                console.log('123')
                io.to(socketId).emit("chat", {chat:payload.chat,clientId: payload.clientId});
            });
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);

        // Remove socket ID from all rooms
        roomsName.forEach((sockets, roomName) => {
            const index = sockets.indexOf(socket.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                console.log(`Socket ${socket.id} removed from room ${roomName}`);
            }

            // Clean up the room if it's empty
            if (sockets.length === 0) {
                roomsName.delete(roomName);
                chatSave.delete(roomName); // Clean up chat history for the empty room
                console.log(`Room ${roomName} is empty and has been deleted`);
            }
        });

        console.log("Current rooms after disconnect:", roomsName);
    });
});


// Add a GET request handler
app.get('/rooms', (req, res) => {
    // Convert the Map of rooms to an array of room names
    const rooms = Array.from(roomsName.keys());
    res.json({ rooms });
});



server.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});
