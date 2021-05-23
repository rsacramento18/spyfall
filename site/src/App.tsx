import{ useState, useCallback, useEffect, useContext }  from 'react';
import {SocketContext} from "./objects/socket";
import { State, initState, Player }  from "./objects/constants";
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
   
  const socket = useContext(SocketContext);

  const handleChangeToCreatePage = useCallback(() => {
    setState({...state, stage: "create"});
  }, []);

  const handleGameCode = useCallback((gameCode: string) => {
    setGameCode(gameCode);
  }, []);

  const handleSetState = useCallback((state: State) => {
    setState(state);
  }, []);

  const handleInit = useCallback((player: Player) => {
    setPlayer(player);
  }, []);

  useEffect(() => {
    socket.on("changeToCreatePage", handleChangeToCreatePage);
    socket.on("gameCode", handleGameCode);
    socket.on("setState", handleSetState);
    socket.on("init", handleInit);

    return () => {
      socket.off("changeToCreatePage", handleChangeToCreatePage);
      socket.off("gameCode", handleGameCode);
      socket.off("setState", handleSetState);
      socket.off("init", handleInit);
    };
  }, [socket, handleChangeToCreatePage, handleGameCode, handleSetState, handleInit]);

  const screen = () => {

    if(state.stage === "init") {
      return <Init />
    }
    else if(state.stage === "create") {
      return <CreateGame />
    }
    else if(state.stage === 'waiting'){
      return <WaitingRoom player={player} state={state} gameCode={gameCode}/>
    }
    else if (state.stage === 'play') {
      return <Game player={player} state={state} gameCode={gameCode} />
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
    <SocketContext.Provider value={socket}>
      <div className="App bg-background bg-spyfall bg-center bg-no-repeat h-screen">
        {screen()}
      </div>
    </SocketContext.Provider>
  );
}

export default App;
