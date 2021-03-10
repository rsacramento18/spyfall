const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});
const { createGameState, updateState, gameLoop } = require('./game');
const { makeid } = require('./utils');
const FRAME_RATE = 1;

const state = {};
const clientRooms = {};

const PORT = 8080 || process.env.PORT;

io.on('connection', client => {

    client.on('createGame', handleCreateGame);
    client.on('joinGame', handleJoinGame);
    client.on('startGame', startGameInterval);

    function handleCreateGame(gameData) {
        let roomName = makeid(5);
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);

        let player={
            id: client.id,
            playerName: gameData.playerName,
            score: 0,
        }

        state[roomName] = createGameState(gameData, player);

        client.join(roomName);
        client.emit('init', client.id);
        emitGameState(roomName, state[roomName]);

    }

    function handleJoinGame(joinData) {
        let gameCode = joinData.gameCode;
        let playerName = joinData.playerName;

        let room = io.of('/').adapter.rooms.get(gameCode).size;

        if(!room) {
            return;
        }

        let numClients = io.of('/').adapter.rooms.get(gameCode).size;

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
        client.emit('gameCode', gameCode);

        let player = {
            id: client.id,
            playerName: playerName,
            score: 0,
        }

        client.emit('init', client.id);

        state[gameCode].players.push(player);

        emitGameState(gameCode, state[gameCode]);
    }

    function startGameInterval(roomName){
        console.log("ROOOM NAME IS" + roomName);

        state[roomName].stage = "play";

        const intervalId = setInterval(() => {
            state[roomName] = updateState(state[roomName]);

            const winner = gameLoop(state[roomName]);

            if (!winner) {
                emitGameState(roomName, state[roomName]);
            }
            else {
                state[roomName].stage = "end";
                emitGameState(roomName, state[roomName]);

                client.emit('gameOver');

                clearInterval(intervalId);
            }

        }, 1000 / FRAME_RATE)
    }

    
});


function emitGameState(roomName, state) {
    io.sockets.in(roomName)
        .emit('setState', state);
    console.log(state);
}

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
