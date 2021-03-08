import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

const CreateGame = () => {

  const {register, handleSubmit} = useForm(); 
  const history = useHistory();

  const ENDPOINT = "http://localhost:8080";
  const socket = io(ENDPOINT);


  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    socket.emit("creategame", data);
    history.push('/waitplayers');
  }

  return (
    <div>

      <h1>Create Game Page!</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="number" name="playercount" ref={register} placeholder="Number of players"/>
        </div>

        <div>
          <input type="number" name="roundtime" ref={register} placeholder="Round time"/>
        </div>

        <div>
          <input type="text" name="playerName" ref={register} placeholder="Player Name"/>
        </div>

        <input type="submit" value="Create Game"/>
        
      </form>
    </div>
  );
}

export default CreateGame;
