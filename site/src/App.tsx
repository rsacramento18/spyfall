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


  const joinGame = (data: any) => alert(JSON.stringify(data));

  const onSubmit = (data: any) => {
    socket.emit("creategame", data);
  }

  useEffect(() => {
    socket.on("gamecode", (gameCode: string) => {
      setGameCode(gameCode);
    });
    socket.on("setstate", (state: State) => {
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
              <input type="text" name="roomName" ref={register} placeholder="Room Name" />
              <button>Join Game</button>
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
            <input type="number" name="playercount" ref={register} placeholder="Number of players"/>
          </div>
          <div>
            <input type="number" name="roundtime" ref={register} placeholder="Round time"/>
          </div>
          <div>
            <input type="text" name="playerhost" ref={register} placeholder="Player Name"/>
          </div>
          <input type="submit" value="Create Game"/>
        </form>
      </div>
    );

  }
  else if(state.stage === 'waiting'){

    return (
      <div>
        <h1>Waiting for players</h1>
        {state.players.map( (player: Player, index: number) => {
          return(
            <div key={index}>
              <h1>{player.playerName}-{player.id}</h1>
            </div>
          )
        })}
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
