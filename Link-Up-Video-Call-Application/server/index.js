/*----------Importing Files----------*/

//Importing express module
const express = require('express');
//Creating app module
const app = express();
//Importing http - built in node module
const http = require('http').createServer(app);
//Function to call http where socket.io is going to run
//Importing socket.io
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;
// Accessing the path module
const path = require('path');
//dotenv to config
require("dotenv").config();

let socketList = {};

app.use(express.static(path.join(__dirname, 'public')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));

//   app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
// }

// Route
app.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

// Socket
//When the user is forming a connection with socket.io
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('User disconnected!');
  });

  //Checking the user
  //The BE-check-user event will get started from the client side
  //Pulling roomId, userName and checking for validity
  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      //If the user already exist then show error
      socket.emit('FE-error-user-exist', { error }); //If the user already exists
    });
  });

  /*----------------Join Room------------------ */
  //After checking the user the BE-join-room event will get started pulling roomId and username
  socket.on('BE-join-room', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  //Send message 
  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  //Leave room
  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  //To mute and unmute audio and camera
  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
});

// http.listen(PORT, () => {
//   console.log('Connected : 3001');
// });

http.listen(process.env.PORT || 3001, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`)
  // console.log('You are connected at 3001!');
});
