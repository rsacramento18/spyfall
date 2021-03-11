import { useForm } from "react-hook-form";

const CreateGame = (props: any) => {

  const {register, handleSubmit} = useForm(); 

  const onSubmit = (data: any) => props.socket.emit("createGame", data);

  return (
    <div className="bg-none flex h-screen">
      <div className="bg-white bg-pattern w-3/4 m-auto rounded-sm py-8 flex align-center flex-col justify-center">
        <div className="text-center">
          <h1 className="text-4xl">Create Game</h1>
        </div>
        <div className="flex justify-center">
          <form className="flex flex-col justify-center text-center mt-4 p-4 w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <input className="my-1 w-44 border border-black rounded-sm p-2" type="number" name="playerCount" ref={register} placeholder="Number of players"/>
            <input className="my-1 w-44 border border-black rounded-sm p-2" type="number" name="roundTime" ref={register} placeholder="Round time"/>
            <input className="my-1 w-44 border border-black rounded-sm p-2" type="text" name="playerName" ref={register} placeholder="Player Name"/>
            <input className="text-white font-bold p-4 my-1 w-44 bg-blue-500" type="submit" value="Create Game"/>
          </form>
        </div>
      </div>
    </div>
  );

}

export default CreateGame;
