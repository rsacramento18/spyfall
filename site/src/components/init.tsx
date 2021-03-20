import { useForm } from "react-hook-form";

const Init = (props: any) => {

  const {register, handleSubmit} = useForm(); 

  const createGame = () => props.socket.emit("toCreatePage");

  const joinGame = (data: any) => props.socket.emit("joinGame", data);

  return (
    <div className="flex flex-col h-screen py-4">
        <div className="text-white text-center mt-16 text-4xl uppercase">
          <h1>Spyfall</h1>
        </div>
        <div className="bg-primary my-14 mx-auto w-2/3 p-6 rounded bg-opacity-80">
          <button className="w-full text-center font-medium bg-button text-white p-4 rounded cursor-pointer"  onClick={createGame}>Create New Game</button>
        </div>
        <div className="bg-primary my-4 mt-40 mx-auto w-2/3 p-6 rounded bg-opacity-80">
          <form className="flex flex-col" onSubmit={handleSubmit(joinGame)}>
            <input className="w-full text-center font-medium bg-button text-white p-2 rounded my-2 cursor-pointer" type="submit" value="Join Game"/>
            <input className="bg-background p-2 my-2 rounded border text-gray-400" type="text" name="playerName" ref={register} placeholder="Player Name" />
            <input className="bg-background p-2 my-2 rounded border text-gray-400" type="text" name="gameCode" ref={register} placeholder="Room Name" />
          </form>
        </div>
    </div>
  );
}

export default Init;
