import { Player } from "../objects/constants";

const Game = (props: any) => {

  return (
    <div className="flex flex-col h-screen py-4">
      <div>
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          <h1 className="text-4xl">{props.state.roundTime.minutes}:{props.state.roundTime.seconds}</h1>
        </div>
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          {props.state.players.map(( player: Player, index: number) => {
            return (
              <div className="w-2/4 h-24 mx-2 my-2 text-center bg-white  bg-pattern" key={index}>
                <h1 className="text-lg uppercase text-black font-bold py-2">{player.playerName}</h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  );

}

export default Game;
