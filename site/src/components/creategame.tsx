import { useForm } from "react-hook-form";

const CreateGame = (props: any) => {

  const {register, handleSubmit} = useForm(); 

  const onSubmit = (data: any) => props.socket.emit("createGame", data);

  const rigGame = () => props.socket.emit("rig");

  return (
    <div className="flex flex-col h-screen py-4">
      <div className="text-gray-400 text-center mt-16 text-4xl uppercase">
        <h1 className="text-4xl">Create Game</h1>
      <button className="w-full text-center font-medium bg-button text-white p-4 rounded cursor-pointer"  onClick={rigGame}>Rig Game</button>
      </div>
      <div className="bg-primary my-14 mx-auto w-2/3 p-6 rounded bg-opacity-80">
        <form className="flex flex-col justify-center text-center p-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <input className="bg-background p-2 my-2 rounded border text-gray-400" type="number" name="playerCount" ref={register} placeholder="Number of players"/>
          <input className="bg-background p-2 my-2 rounded border text-gray-400" type="number" name="roundTime" ref={register} placeholder="Round time"/>
          <input className="bg-background p-2 my-2 rounded border text-gray-400" type="text" name="playerName" ref={register} placeholder="Player Name"/>
          <input className="w-full text-center font-medium bg-button text-white p-2 rounded my-2" type="submit" value="Create Game"/>
        </form>
      </div>
    </div>
  );

}

export default CreateGame;
