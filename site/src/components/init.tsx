import { useForm } from "react-hook-form";

const Init = (props: any) => {

  const {register, handleSubmit} = useForm(); 

  const createGame = () => props.socket.emit("toCreatePage");

  const joinGame = (data: any) => props.socket.emit("joinGame", data);

  return (
    <div className="flex flex-col h-screen py-4">
        <div className="text-white text-center mt-16 text-4xl uppercase">
          <h1 className="">Spyfall</h1>
        </div>
        <div className="bg-primary my-4 my-14 mx-auto w-2/3 p-6 rounded bg-opacity-80">
          <button className="w-full text-center font-medium bg-button text-white p-4 rounded" onClick={createGame}>Create New Game</button>
        </div>
        <div className="bg-primary my-4 mt-40 mx-auto w-2/3 p-6 rounded bg-opacity-80">
          <form className="" onSubmit={handleSubmit(joinGame)}>
            <input className="" type="submit" value="Join Game"/>
            <input className="" type="text" name="playerName" ref={register} placeholder="Player Name" />
            <input className="" type="text" name="gameCode" ref={register} placeholder="Room Name" />
          </form>
        </div>
    </div>
  );
}

export default Init;
