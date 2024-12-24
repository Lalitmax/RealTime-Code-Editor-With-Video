// lib/socket.ts
import { io, Socket } from 'socket.io-client';
// const socket: Socket = io('https://realtime-code-editor-with-video.onrender.com');

const socket: Socket = io('http://localhost:3005');

export default socket;
