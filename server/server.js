const express = require('express');
const http = require('http');
const path =  require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// io es un ref a un web socket Server
// con todo lo necesario para emitir o recibir mensajes
var io = socketIO(server);

app.use(express.static(publicPath));
// io.on register an event listenr for especific event and do something
// 'connection' permite registrar nuevas conexiones y abre el serversocket
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
