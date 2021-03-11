import { Player } from "../objects/constants";

const WaitingRoom = (props: any) => {
  
  const startGame = () => {
    props.socket.emit('startGame', props.gameCode);
  }

  const showButton = () => {
    if(props.player.id === props.state.playerHost.id) {
      if(props.state.players.length === props.state.playerCount) {
        return <button className="font-bold text-white w-44 p-4 bg-blue-500 rounded-sm" onClick={startGame}>Start Game</button>
      }
      else {
        return <button className="font-bold text-white w-44 p-4 bg-gray-500 rounded-sm" disabled>Start Game</button>
      }
    }
  }

  return (
    <div className="bg-none flex h-screen">
      <div className="bg-none text-white w-5/6 my-6 mx-auto rounded-sm py-8 flex flex-col justify-between justify-between align-center">
        <div>
          <div className="text-center">
            <h1 className="text-3xl">Waiting for players</h1>
          </div>
          <div className="flex justify-center text-center my-4">
            <h1 className="text-2xl">{props.gameCode}</h1>
          </div>
          <div className="flex flex-col">
            {props.state.players.map( (player: Player, index: number) => {
            return(
              <div className="w-2/3 mx-auto my-2 text-center bg-white  bg-pattern" key={index}>
                <h1 className="text-lg uppercase text-black font-bold py-2">{player.playerName}</h1>
              </div>
            )
            })}
          </div>
        </div>
        <div className="mx-auto">
          { showButton()}
        </div>
      </div>
    </div>
  );

}

export default WaitingRoom;
