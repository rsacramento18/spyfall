import { Player } from "../objects/constants";

const WaitingRoom = (props: any) => {
  
  const startGame = () => {
    props.socket.emit('startGame', props.gameCode);
  }

  const showButton = () => {
    if(props.player.id === props.state.playerHost.id) {
      if(props.state.players.length === props.state.playerCount) {
      return (
        <div className="m-auto bg-primary bg-opacity-80 w-2/3 p-6 rounded bg-opacity-80">
          <button className="w-full text-center font-medium bg-button text-white p-2 rounded my-2" onClick={startGame}>Start Game</button>
        </div>
      )
        
      }
    }
  }

  return (
    <div className="flex flex-col h-screen py-4">
      <div className="text-white text-center mt-16 text-4xl uppercase">
        <h1>Waiting for players</h1>
      </div>
      <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
        <h1 className="text-2xl">{props.gameCode}</h1>
      </div>
      <div className="flex flex-col bg-primary mx-auto w-2/3 p-6 rounded bg-opacity-80">
        {props.state.players.map( (player: Player, index: number) => {
        return(
          <div className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded" key={index}>
            <h1 className="text-lg uppercase font-bold py-2">{player.playerName}</h1>
          </div>
        )
        })}
      </div>
        { showButton()}
    </div>
  );

}

export default WaitingRoom;
