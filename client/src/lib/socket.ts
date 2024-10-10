// lib/socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3005');
// const socket: Socket = io('https://group-chat-backend-wqeh.onrender.com');

export default socket;
