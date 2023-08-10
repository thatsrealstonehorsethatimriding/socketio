const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("Page requested.");
})

io.on('connection', (socket) => {
    console.log('User connected..');
    socket.on('sendMessage', (mesaj) => {
        console.log('Gelen Mesaj:', mesaj);
        io.emit('mesajGeldi', mesaj);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

server.listen(3000, () => {
    console.log('Sunucu 3000 portunda calisiyor ');
});
