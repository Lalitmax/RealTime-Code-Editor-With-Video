# RealTime Code Editor With Video

## Overview

**RealTime Code Editor With Video** is a collaborative platform that merges live code editing with video chat, allowing developers to code together in real-time while maintaining seamless communication. With features like multi-user support and syntax highlighting, this tool is perfect for pair programming, remote team collaboration, and coding interviews.

## Features

- **Real-Time Code Editing:** Multiple users can edit code collaboratively with instantaneous updates.
- **Video Chat Integration:** Built-in video chat enables real-time communication alongside coding.
- **Multi-User Support:** Accommodates multiple participants in a single coding session.
- **Syntax Highlighting:** Supports a variety of programming languages with syntax highlighting for enhanced readability.
- **Cross-Platform:** Works on all major devices and operating systems.

## Table of Contents
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Socket.IO Setup](#socketio-setup)
- [Contributing](#contributing)

---

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or above)
- npm (Node package manager)
- Refer to the [Socket.IO Documentation](https://socket.io/docs/v4) for additional insights on real-time communication.

### Environment Variables
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
- **`server/`**: Hosts the backend using Express and Socket.IO for real-time interactions.

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

## Socket.IO Setup
Socket.IO facilitates real-time, bi-directional communication between the client and server. For additional customization and features, check out the [Socket.IO Documentation](https://socket.io/docs/v4).

## Contributing
We welcome contributions from the community! Join us in enhancing the RealTime Code Editor With Video and enjoy collaborative coding!