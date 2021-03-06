const express = require('express');
const http = require('http');
const path =  require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// io es un ref a un web socket Server
// con todo lo necesario para emitir o recibir mensajes
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));
// io.on register an event listenr for especific event and do something
// 'connection' permite registrar nuevas conexiones y abre el serversocket
io.on("connection", (socket) => {
  console.log('New user connected');


  socket.on('join', (params, callback) => {
    var user = users.getUserByName(params.name);

    if (user) {
      return callback('Name already in use.');
    }

    if (!isRealString(params.name) || !(isRealString(params.room) || isRealString(params.rooms))) {
      return callback('Name and room name are required.');
    }

    var room;
    if (!params.room) {
      room = params.rooms;
    } else {
      room = params.room.toLowerCase();
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('getRooms', (message, callback) => {
    var rooms = users.getRooms();
    callback(rooms);
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
