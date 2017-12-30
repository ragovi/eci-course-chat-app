const express = require('express');
const http = require('http');
const path =  require('path');
const socketIO = require('socket.io');

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

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
