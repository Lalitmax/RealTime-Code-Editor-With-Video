# RealTime Code Editor With Video

## Overview

**RealTime Code Editor With Video** is a collaborative platform that merges live code editing with video chat, allowing developers to code together in real-time while maintaining seamless communication. With features like multi-user support and syntax highlighting, this tool is perfect for pair programming, remote team collaboration, and coding interviews.

[![RealTime Code Editor](https://github.com/user-attachments/assets/f1bee36e-ea35-42d7-8aca-4c1353dae4ca)](https://codemax-demo.vercel.app/)

## Features

- **Real-Time Code Editing:** Multiple users can edit code collaboratively with instantaneous updates.
- **Video Chat Integration:** Built-in video chat enables real-time communication alongside coding.
- **Multi-User Support:** Accommodates multiple participants in a single coding session.
- **Syntax Highlighting:** Supports a variety of programming languages with syntax highlighting for enhanced readability.
- **Cross-Platform:** Works on all major devices and operating systems.

## Table of Contents
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Environment Variables for client](#environment-variables-for-client)
  - [Environment Variables for server](#environment-variables-for-server)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [socket setup](#socket-setup) 
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

---

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or above)
- npm (Node package manager)
- Refer to the [Socket.IO Documentation](https://socket.io/docs/v4) for additional insights on real-time communication.

### Environment Variables for client
To configure your application with Agora and the backend, follow these steps:

1. Open your `.env` file in the root directory of your project.
2. Add the following environment variables:

```env
NEXT_PUBLIC_AGORA_APP_ID=random234fmdjd3ed3ed3wd  # Replace with your Agora App ID
```
   
### Environment Variables for server
To set up the server, you need to create an environment variable for the port:

1. Navigate to the `server` folder.
2. Create a `.env` file.
3. Add the following:

   ```bash
   PORT=3005

### Installation
Clone this repository and navigate into the project directory:

```bash
git clone https://github.com/Lalitmax/RealTime-Code-Editor-With-Video.git
cd RealTime-Code-Editor-With-Video
```

#### Client Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

#### Server Setup
1. Navigate to the `server` folder:
   ```bash
   cd ../server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Project Structure
- **`client/`**: Contains the frontend code using Next.js, with video and code editor components.
  
  <img width="347" alt="client ps" src="https://github.com/user-attachments/assets/3272d01a-bf3d-4718-8357-290d538677e7" />

- **`server/`**: Hosts the backend using Express and Socket.IO for real-time interactions.

  <img width="303" alt="server ps" src="https://github.com/user-attachments/assets/fdc3a7de-7d25-4326-86c0-1c6a808d16da" />

## Socket Setup

In your project, the socket connection is established in the `lib/socket.ts` file. To set up the correct backend URL for your project, follow these steps:

1. Open the `lib/socket.ts` file.
2. Replace the current backend URL with your own server URL.

For example:
```ts
// lib/socket.ts
import { io, Socket } from 'socket.io-client';

// Replace the URL below with your backend URL
const socket: Socket = io('https://your-backend-url.com');  // Replace with your backend URL

export default socket;
```

## Running the Application

#### Start the Client
1. Run the client in development mode:
   ```bash
   cd client
   npm run dev
   ```
2. The client will be accessible at `http://localhost:3000`.

#### Start the Server
1. Run the server:
   ```bash
   cd ../server
   npm start
   ```
2. The server will run on `http://localhost:3005`.


## Contributing
We welcome contributions from the community! Join us in enhancing the RealTime Code Editor With Video and enjoy collaborative coding!
