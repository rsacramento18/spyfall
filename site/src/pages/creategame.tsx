import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import ENDPOINT from '../objects/state';

const CreateGame = () => {

  const {register, handleSubmit} = useForm(); 
  const history = useHistory();

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    // history.push('/playgame');
  }

  const ENDPOINT = "http://localhost:8080";

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connection", (data: string) => {
      console.log(data);
    });
  });

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

        <input type="submit" value="Create Game"/>
        
      </form>
    </div>
  );
}

export default CreateGame;
