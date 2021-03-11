import { Player } from "../objects/constants";

const Game = (props: any) => {

  return (
    <div className="bg-none flex h-screen">
      <div className="w-5/6 my-6 mx-auto flex flex-col justify-between align-center">
        <div className="">
          <div className="w-2/6 bg-white bg-pattern text-align mx-auto">
            <h1 className="text-4xl">{props.state.roundTime.minutes}:{props.state.roundTime.seconds}</h1>
          </div>
          <div className="flex justify-center align-center my-8">
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
    </div>

  );

}

export default Game;
