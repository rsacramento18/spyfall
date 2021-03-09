const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});
const { createGameState } = require('./game');

const state = {};
const clientRooms = {};

const PORT = 8080 || process.env.PORT;


io.on('connection', client => {
    client.on('creategame', handleCreateGame);

    function handleCreateGame(gameData) {
        let roomName = makeid(5);
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);

        state[roomName] = createGameState(gameData);

        client.join(roomName);
        client.number = 1;
        client.emit('init', 1);

        console.log(gameData);
    }
});

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


