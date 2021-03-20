const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});
const { createGameState, updateState, gameLoop, moveTurn, startVote, isVotingDone } = require('./game');
const { makeid } = require('./utils');
const FRAME_RATE = 100;

const state = {};
const clientRooms = {};

const PORT = 8080 || process.env.PORT;

io.on('connection', client => {

    client.on('toCreatePage', () => {
        client.emit('changeToCreatePage');
        console.log("Clicked Create game");
    });
    client.on('createGame', handleCreateGame);
    client.on('joinGame', handleJoinGame);
    client.on('startGame', startGameInterval);
    client.on('question', handleQuestion);
    client.on('startVote', handleStartVote);
    client.on('vote', handleVote);
    // client.on('spy', handleSpy);
    // client.on('endGame', handleEndGame);


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
        client.emit('init', player);
        emitGameState(roomName, state[roomName]);

    }

    function handleJoinGame(joinData) {
        let gameCode = joinData.gameCode.toLowerCase();
        let playerName = joinData.playerName;

        if(typeof io.of('/').adapter.rooms.get(gameCode) === 'undefined'){
            client.emit('gameCodeInvalid')
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

        }, 1000)
    }

    function handleQuestion(toPlayer, roomName) {
        state[roomName] = moveTurn(state[roomName], toPlayer);

        emitGameState(roomName, state[roomName]);
        client.emit('questionDone');
    }

    function handleStartVote(fromPlayer, toPlayer, roomName) {
        console.log("START VOTING");

        state[roomName] = starVote(fromPlayer, toPlayer, state[roomName]);
        io.sockets.in(roomName).emit('votingStarted', state[roomName]);

        const intervalId = setInterval(() => {

            const vote = isVotingDone(state[roomName]);

            if(!winner) {
                emitGameState(roomName, state[roomName]);
            }
            else {
                io.sockets.in(roomName).emit('votingDone', state);
            }

        }, 1000);
    }

    function handleVote(vote, roomName) {
        state[roomName] = vote(vote, state);
        
        emitGameState(roomName, state[roomName]);
    }
});


function emitGameState(roomName, state) {
    io.sockets.in(roomName)
        .emit('setState', state);
}

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
