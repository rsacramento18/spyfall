const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});

const PORT = 8080 || process.env.PORT;

io.on('connection', client => {
    client.emit('init', {data: 'hello world'});

    client.on('creategame', handleGameStart);

    function handleGameStart(gameData) {
        console.log("game started");
        console.log(gameData);
    }
});

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


