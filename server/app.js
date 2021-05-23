const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});
const { createGameState, createGameStateRigged, initGame, updateState, gameLoop, moveTurn, startVote, isVotingDone, voteAction } = require('./game');
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
    client.on('askQuestion', handleAskQuestion);
    client.on('askQuestionDone', handleAskQuestionDone);
    client.on('startVote', handleStartVote);
    client.on('vote', handleVote);
    // client.on('spy', handleSpy);
    // client.on('endGame', handleEndGame);
    
    client.on('rig', handleRig);

    function handleRig() {

        let roomName = makeid(5);
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);

        let player={
            id: "1",
            playerName: "Ricardo",
            score: 0,
        }

        state[roomName] = createGameStateRigged(player);

        client.join(roomName);
        client.emit('init', player);
        emitGameState(roomName, state[roomName]);

    }


    function handleCreateGame(gameData) {
        // let roomName = makeid(5);
        let roomName = "aaaaa"
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
        // let gameCode = joinData.gameCode.toLowerCase();
        let gameCode = "aaaaa";
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

        // client.rooms[client.id] = gameCode;
        client.join(gameCode);
        client.emit('gameCode', gameCode);
        client.rooms[client.id] = "aaaaa";

        let player = {
            id: client.id,
            playerName: playerName,
            score: 0,
        }

        client.emit('init', player);

        state[gameCode].players.push(player);

        emitGameState(gameCode, state[gameCode]);
    }

    function startGameInterval(roomName){

        state[roomName].stage = "play";

        state[roomName] = initGame(state[roomName]);

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

    function handleAskQuestion(playerTo, roomName) {
        io.sockets.in(roomName).emit('askQuestionStarted', playerTo);
    }

    function handleAskQuestionDone(toPlayer, roomName) {
        state[roomName] = moveTurn(state[roomName], toPlayer);

        emitGameState(roomName, state[roomName]);
        io.sockets.in(roomName).emit('askQuestionDone');
    }

    function handleStartVote(fromPlayer, toPlayer, roomName) {
        roomName = roomName.toLowerCase();

        state[roomName] = startVote(fromPlayer, toPlayer, state[roomName]);
        io.sockets.in(roomName).emit('votingStarted', fromPlayer, toPlayer);
        emitGameState(roomName, state[roomName]);

        const intervalId = setInterval(() => {

            const votingDone = isVotingDone(state[roomName]);
            console.log(votingDone);

            if(!votingDone) {
                emitGameState(roomName, state[roomName]);
            }
            else {
                io.sockets.in(roomName).emit('votingDone', state);
                clearInterval(intervalId);
            }
        }, 1000);
    }

    function handleVote(vote, roomName) {
        state[roomName] = voteAction(vote, state[roomName]);
        
        emitGameState(roomName, state[roomName]);
        
        client.emit("voteComplete");
    }
});

function emitGameState(roomName, state) {
    io.sockets.in(roomName)
        .emit('setState', state);
}

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
