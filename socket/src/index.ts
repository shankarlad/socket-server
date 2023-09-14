import express from 'express';
import http from 'http';

import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app); // create a server
const io = new Server(server, { cors: { origin: "*" } }); // create a socket instance

// socket connection
io.on('connection', (socket) => {
    console.log('Connected');

    // listen to the event from the client
    socket.on('host-event', (data) => {
        // emit the event to all clients
        io.emit('draw-to-canvas', data);
    });

    // disconnect event
    socket.on('disconnect', () => {
        console.log('disconnected');
    });

});

// start the server
server.listen(3000, () => {
    console.log('listening on port : 3000');
});