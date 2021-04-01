import React, { useState, useEffect }  from 'react';
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { ENDPOINT, ENDPOINT_LOCAL, State, initState, Player, initStateRigged, playerRigged }  from "./objects/constants";
import Init from "./components/init";
import CreateGame from "./components/creategame";
import WaitingRoom from "./components/waitingroom";
import Game from "./components/game";


function App() {

  // const [state, setState] = useState<State>(initStateRigged);
  // const [gameCode, setGameCode] = useState<string>("kjfk");
  // const [player, setPlayer] = useState<Player>(playerRigged);

  const [state, setState] = useState<State>(initState);
  const [gameCode, setGameCode] = useState<string>();
  const [player, setPlayer] = useState<Player>();

  const socket = io(ENDPOINT_LOCAL);

  useEffect(() => {
    socket.on("changeToCreatePage", () => {
      setState({...state, stage: "create"});
    });
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

  const screen = () => {

    if(state.stage === "init") {
      return <Init socket={socket}/>
    }
    else if(state.stage === "create") {
      return <CreateGame socket={socket}/>
    }
    else if(state.stage === 'waiting'){
      return <WaitingRoom socket={socket} player={player} state={state} gameCode={gameCode}/>
    }
    else if (state.stage === 'play') {
      return <Game socket={socket} player={player} state={state} gameCode={gameCode} />
    }
    else {
      return (
        <div>
          No State selected
          </div>
      );
    }
  }

  return (
    <div className="App bg-background bg-spyfall bg-center bg-no-repeat h-screen">
      {screen()}
    </div>
  );
}

export default App;
