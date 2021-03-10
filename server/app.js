const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});
const { createGameState, player } = require('./game');
const { makeid } = require('./utils');

const state = {};
const clientRooms = {};

const PORT = 8080 || process.env.PORT;


io.on('connection', client => {

    client.on('createGame', handleCreateGame);
    client.on('joinGame', handleJoinGame);

    function handleCreateGame(gameData) {
        let roomName = makeid(5);
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);

        state[roomName] = createGameState(gameData);

        client.join(roomName);
        client.number = 1;
        client.emit('init', client.number);
        emitGameState(roomName, state[roomName]);

        console.log(gameData);
    }

    function handleJoinGame(joinData) {
        let gameCode = joinData.gameCode;
        let playerName = joinData.playerName;
        
        const room = io.sockets.adapter.rooms[gameCode];


        let allUsers;
        if(room) {
            allUsers = room.sockets;
            console.log(room.sockets);
        }

        let numClients;
        if(allUsers) {
            numClients = Object.keys(allUsers).length;
        }

        if(numClients === 0) {
            client.emit('unknownGame')
            return;
        }
        else if(numClients >= state[gameCode].playerCount) {
            client.emit('roomFull');
            return;
        }

        client.rooms[client.id] = gameCode;
        client.join(gameCode);
        client.number = numClients + 1;

        let player = {
            id: client.number,
            playerName: playerName,
        }

        client.emit('init', client.number);

        state[gameCode].players.push(player);

        emitGameState(gameCode, state[gameCode]);
        console.log(state[gameCode]);

    }
    
});

io.on('disconnecting', () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
});

io.on('disconnect', () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
});

function emitGameState(roomName, state) {
    io.sockets.in(roomName)
        .emit('setState', state);
}

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


