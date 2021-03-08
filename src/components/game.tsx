import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import State from "../objects/state";

const Game = () => {

    const { register, handleSubmit } = useForm();

    const [gameState, setGameState] = useState(State.INITIAL);

    const onSubmit = (data : any) => {
        alert(JSON.stringify(data));
        setGameState(State.STARTED);
    }

    if(gameState === State.INITIAL) {
        return (
            <div className="writer">
                <div className="login">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div> 
                            <input type="text" name="username" ref={register} placeholder="username" />
                        </div>
                        <input type="submit" value="entrar"/>
                    </form>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                Testing!!!!
            </div>

        );
    }
}

export default Game;
