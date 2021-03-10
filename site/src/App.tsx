import React, { useState, useEffect }  from 'react';
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { ENDPOINT, State, initState, Player }  from "./objects/constants";

function App() {

  const {register, handleSubmit} = useForm(); 

  const [state, setState] = useState<State>(initState);
  const [gameCode, setGameCode] = useState<string>();
  const [player, setPlayer] = useState<Player>();


  const socket = io(ENDPOINT);

  const createGame = () => setState({...state, stage: "create"});


  const joinGame = (data: any) => {
    socket.emit("joinGame", data);
  }

  const onSubmit = (data: any) => {
    socket.emit("createGame", data);
  }

  const startGame = () => {
    let roomName = gameCode;
    console.log(roomName);
    socket.emit('startGame', roomName );
  }

  useEffect(() => {
    socket.on("gameCode", (gameCode: string) => {
      setGameCode(gameCode);
    });
    socket.on("setState", (state: State) => {
      setState(state);
    });
    socket.on("init", (player: Player) => {
      setPlayer(player);
    });
  });

  if(state.stage === "init") {
    return (
      <div className="app">
        <h1>Spyfall</h1>
        <div className="wrapper">
          <div className="create_game">
            <button onClick={createGame}>Create New Game</button>
          </div>
          <div className="join_game">
            <form onSubmit={handleSubmit(joinGame)}>
              <input type="text" name="playerName" ref={register} placeholder="Player Name" />
              <input type="text" name="gameCode" ref={register} placeholder="Room Name" />
              <input type="submit"   value="Join Game"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
  else if(state.stage === 'create') {

    return (
      <div>
        <h1>Create Game Page!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="number" name="playerCount" ref={register} placeholder="Number of players"/>
          </div>
          <div>
            <input type="number" name="roundTime" ref={register} placeholder="Round time"/>
          </div>
          <div>
            <input type="text" name="playerName" ref={register} placeholder="Player Name"/>
          </div>
          <input type="submit" value="Create Game"/>
        </form>
      </div>
    );

  }
  else if(state.stage === 'waiting'){

    return (
      <div>
        <h1>Waiting for players - room - {gameCode}</h1>
        {state.players.map( (player: Player, index: number) => {
          return(
            <div key={index}>
              <h1>{player.playerName}-{player.id}</h1>
            </div>
          )
        })}
        { state.players.length === state.playerCount ? (
            <button onClick={startGame}>StartGame</button>
        ) :
            <button disabled onClick={startGame}>StartGame</button>
        }
      </div>
    );

  }

  else if (state.stage === 'play') {
    return (
      <div>
        <h1>O JOGO COMEÇOU FODA-SE!</h1>  
        <div>{state.roundTime.minutes}:{state.roundTime.seconds}</div>
      </div>

    );
  }
  else {
    return (
      <div>
        No State selected
        </div>
    );
  }
}

export default App;
