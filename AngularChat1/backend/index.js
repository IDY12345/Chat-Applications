const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
app.use(cors());
const server = http.createServer(app);




const io =new Server(server,{
    origin:"http://localhost:4200",
    methods:["GET","POST"]
});


io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room)
        socket.broadcast(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message });
    })
})
server.listen(3002, () => {
    console.log("Server is Running");
});