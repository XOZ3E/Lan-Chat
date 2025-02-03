const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve login and chat pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/chat.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

// Socket.IO
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '20.0.21.156', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
