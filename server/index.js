import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import axios from 'axios';  


dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const roomsName = new Map();
let chatSave = new Map();
const port = process.env.PORT || 3002;
let cnt = 0;

app.use(express.json());
app.use(cors());
 

app.post("/execute", async (req, res) => {
    console.log(req.body);
    try {
        const response = await axios.post("https://api.jdoodle.com/v1/execute", req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Execution error:", error);
        res.status(500).json({ error: "Execution failed" });
    }
});

app.get('/rooms', (req, res) => {
    res.json({ rooms: Array.from(roomsName.keys()) });
});



io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Create or join a room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);

        if (!roomsName.has(roomName)) {
            roomsName.set(roomName, []);
            chatSave.set(roomName, "");
        }


        if (!roomsName.get(roomName).includes(socket.id)) {
            roomsName.get(roomName).push(socket.id);
        }
        console.log(`Socket ${socket.id} joined room ${roomName}`);

        const chatHistory = chatSave.get(roomName);
        console.log("Chat history " + chatHistory);

        io.to(socket.id).emit("newJoin", { chats: chatHistory, isCollab: roomsName.get(roomName).length >= 2 });

        roomsName.get(roomName).forEach(socketId => {
            // if (socketId !== socket.id) {
            io.to(socketId).emit("userJoined", roomsName.get(roomName).length); // Notify others in the room
            // }
        });
        console.log(`Number of users in the room: ${roomsName.get(roomName).length}`);



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
        chatSave.set(roomNameClient, payload.chat);

        const roomsNameArray = roomsName.get(roomNameClient);
        if (roomsNameArray) {
            roomsNameArray.forEach(socketId => {
                io.to(socketId).emit("chat", { chat: payload.chat, clientId: payload.clientId });
            });
        }
    });

    socket.on("leaveRoom", (roomName) => {
        if (roomsName.has(roomName)) {
            const sockets = roomsName.get(roomName);
            const index = sockets.indexOf(socket.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                socket.leave(roomName)
                console.log(`Socket ${socket.id} left room ${roomName}`);
                io.to(roomName).emit("userLeft", roomsName.get(roomName).length);
                console.log('left');

            }

            if (sockets.length === 0) {
                roomsName.delete(roomName);
                chatSave.delete(roomName);
                console.log(`Room ${roomName} is empty and has been deleted`);
            }
        }
    });


    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);

        roomsName.forEach((sockets, roomName) => {
            const index = sockets.indexOf(socket.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                console.log(`Socket ${socket.id} removed from room ${roomName}`);
                io.to(roomName).emit("userLeft", roomsName.get(roomName).length);

            }

            if (sockets.length === 0) {
                roomsName.delete(roomName);
                chatSave.delete(roomName);
                console.log(`Room ${roomName} is empty and has been deleted`);

            }
        });

        console.log("Current rooms after disconnect:", roomsName);
    });

});



server.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});
