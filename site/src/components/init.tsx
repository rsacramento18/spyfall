import { useForm } from "react-hook-form";

const Init = (props: any) => {

  const {register, handleSubmit} = useForm(); 

  const createGame = () => props.socket.emit("toCreatePage");

  const joinGame = (data: any) => props.socket.emit("joinGame", data);

  return (
    <div className="bg-none flex h-screen">
      <div className="bg-white bg-pattern w-3/4 m-auto rounded-sm py-16">
          <div className="create_game text-center">
            <button className="text-white font-bold bg-green-500 p-4 rounded-sm w-44"  onClick={createGame}>Create New Game</button>
          </div>
        <div className="my-8">
          <h1 className="text-7xl text-center">Spyfall</h1>
        </div>
        <div className="flex justify-center">
          <form className="flex flex-col justify-center text-center mt-4 p-4 w-3/4" onSubmit={handleSubmit(joinGame)}>
            <input className="my-1 w-44 bg-blue-500 p-4 text-white font-bold rounded-sm" type="submit" value="Join Game"/>
            <input className="my-1 border border-black rounded-sm p-2" type="text" name="playerName" ref={register} placeholder="Player Name" />
            <input className="my-1 border border-black rounded-sm p-2" type="text" name="gameCode" ref={register} placeholder="Room Name" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Init;
