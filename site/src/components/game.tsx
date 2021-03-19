import React, { useState }  from 'react';
import { useForm } from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPoll, faMonument, faUserSecret, faTimes, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Player, blankPlayer } from "../objects/constants";
import PlayerBox from "../components/playerbox";

const Game = (props: any) => {

  const voteIcon = <FontAwesomeIcon icon={faPoll} size="3x" color="#BE3333"/>
  const scoreIcon = <FontAwesomeIcon icon={faMonument} size="3x" color="#BE3333"/>
  const revealSpyIcon = <FontAwesomeIcon icon={faUserSecret} size="3x" color="#BE3333"/>
  const closeIcon = <FontAwesomeIcon icon={faTimes} size="3x" color="#9CA3AF"/>
  const yesIcon = <FontAwesomeIcon icon={faCheckCircle} size="5x" color="#9CA3AF"/>
  const noIcon = <FontAwesomeIcon icon={faTimesCircle} size="5x" color="#9CA3AF"/>

  const [screen, setScreen] = useState("main");
  const [votedPlayer, setVotedPlayer] = useState<Player>(blankPlayer);
  const {register, handleSubmit} = useForm();

  const revealSpy = () => console.log("SpyRevealed");


  const setMain = () => setScreen("main");
  const setVote = () => setScreen("vote");
  const setVoting = () => setScreen("voting");
  const setVotingResult = () => setScreen("votingResult");
  const setReveal = () => setScreen("reveal");
  const setScore = () => setScreen("score");


  const playerTurnMessage = () => {
    if(props.state.playerTurn.id === props.player.id) {
      return (
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          <h1 className="text-3xl">Your turn</h1>
        </div>
      );
    }
    
  }

  const startVoting = (playerTo: Player) => {
    console.log("startVoting");
    props.socket.emit("startVote", props.player, playerTo.id, props.gameRoom);
    setVotedPlayer(playerTo);
    setVotingResult();
  }


  const showScreen = () => {

    if(screen === "vote") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="text-right w-full" onClick={setMain}>
            {closeIcon}
          </div>
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Vote</h1>
            </div>
            <div className="p-4 mt-12">
              {props.state.players.map(( player: Player, index: number) => {
                if(props.player.id !== player.id){
                  return (
                    <div onClick={() => startVoting(player)} className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded" key={index}>
                      <h1 className="text-lg uppercase font-bold py-2">{player.playerName}</h1>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>

      );
    }
    else if(screen === "voting") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="text-right w-full" onClick={setMain}>
            {closeIcon}
          </div>
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Vote</h1>
            </div>
            <div className="p-4 mt-12">
              <div  className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded">
                <h1 className="text-lg uppercase font-bold py-2">{votedPlayer.playerName}</h1>
              </div>
            </div>
            <div className="flex justify-between p-8">
              <div className="flex flex-col">
                {yesIcon}
                <span className="mx-auto text-gray-400 text-4xl uppercase my-4">yes</span>
              </div>
              <div className="flex flex-col">
                {noIcon}
                <span className="mx-auto text-gray-400 text-4xl uppercase my-4">no</span>
              </div>
            </div>
          </div>
        </div>

      );

    }
    else if(screen === "votingResult") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="text-right w-full" onClick={setMain}>
            {closeIcon}
          </div>
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Vote</h1>
            </div>
            <div className="p-4 mt-12">
              <div  className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded">
                <h1 className="text-lg uppercase font-bold py-2">{votedPlayer.playerName}</h1>
              </div>
            </div>
            <div className="flex justify-between p-8">
              <div className="flex flex-col">
                {yesIcon}
                <span className="mx-auto text-gray-400 text-4xl uppercase my-4">{props.state.voting.yes}</span>
              </div>
              <div className="flex flex-col">
                {noIcon}
                <span className="mx-auto text-gray-400 text-4xl uppercase my-4">{props.state.voting.no}</span>
              </div>
            </div>
          </div>
        </div>

      );

    }
    else if(screen === "reveal") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="text-right w-full" onClick={setMain}>
            {closeIcon}
          </div>
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Reveal Spy</h1>
            </div>
            <form className="flex flex-col mt-16" onSubmit={handleSubmit(revealSpy)}>
              <input className="bg-background p-2 my-2 rounded border text-white" type="text" name="environmentGuess" placeholder="Guess the environment" />
              <input className="w-full text-center font-medium bg-button text-white p-2 roudned my-2" type="submit" value="Guess" />
            </form>
          </div>
        </div>

      );
    }
    else if(screen === "score") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="text-right w-full" onClick={setMain}>
            {closeIcon}
          </div>
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Score</h1>
            </div>
            <div className="p-4 mt-12">
              {props.state.players.map((player: Player, index:number) => {
                return (
                  <div key={index} className="flex justify-between">
                    <div className="text-white">
                      <h1 className="text-lg">{player.playerName}:</h1>
                    </div>
                    <div className="text-white">
                      <h1 className="text-lg">{player.score}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col justify-between h-screen py-4">
      <div>
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          <h1 className="text-4xl">{props.state.roundTime.minutes}:{props.state.roundTime.seconds}</h1>
        </div>
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          {props.state.players.map(( player: Player, index: number) => {
            if(props.player.id !== player.id){
              if(player.id === props.state.playerTurn.id){
                return (
                  <div className="w-full mx-auto my-2 text-center bg-background border border-red text-gray-400 rounded" key={index}>
                    <h1 className="text-lg uppercase font-bold py-2">{player.playerName}</h1>
                  </div>
                )
              }
              else {
                return (
                  <div className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded" key={index}>
                    <h1 className="text-lg uppercase font-bold py-2">{player.playerName}</h1>
                  </div>
                )
              }
            }
          })}
        </div>
        {playerTurnMessage()}
      </div>
      <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-11/12 flex justify-center">
        <div className="flex flex-col mx-6" onClick={setVote}>
          {voteIcon}
          <span className="mx-auto">Vote</span>
        </div>
        <div className="flex flex-col mx-6" onClick={setReveal}>
          {revealSpyIcon}
          <span className="mx-auto">Reveal</span>
        </div>
        <div className="flex flex-col mx-6" onClick={setScore}>
          {scoreIcon}
          <span className="mx-auto">Score</span>
        </div>
      </div>


      {showScreen()}
        
    </div>

  );

}

export default Game;
