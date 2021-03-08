import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

const WaitPlayers = () => {

  const [gameData, setGameData] = useState();

  useEffect(() => {
    const ENDPOINT = "http://localhost:8080";
    const socket = io(ENDPOINT);
    socket.on('waitplayers', (data:any) => {
      setGameData(data);
    });
  });


  return (
    <div>
      <h1>
        Waiting for all players
      </h1>
    </div>
  );
}

export default WaitPlayers;
