import { useState, useCallback, useEffect }  from 'react';
import {useContext} from 'react';
import {SocketContext} from "../objects/socket";
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

  const [screen, setScreen] = useState(props.state.gamePhase);
  const [votedPlayer, setVotedPlayer] = useState<Player>(blankPlayer);
  const {register, handleSubmit} = useForm();

  const socket = useContext(SocketContext);

  const setMain = () => setScreen("main");
  const setAskQuestion = () => setScreen("askQuestion");
  const setAskingQuestion = () => setScreen("askingQuestion");
  const setVote = () => setScreen("vote");
  const setVoting = () => setScreen("voting");
  const setVotingResult = () => setScreen("votingResult");
  const setReveal = () => setScreen("reveal");
  const setScore = () => setScreen("score");


  const playerTurnMessage = () => {
    if(props.state.playerTurn.id === props.player.id) {
      return (
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          <button className="w-full text-center font-medium bg-button text-white p-2 roudned my-2" onClick={setAskQuestion}>Ask Question</button>
        </div>
      );
    }
  }

  const environment = () => {
    if(props.player.id !== props.state.spy.id){
      return (
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          <h1 className="text-3xl">{props.state.environment}</h1>
        </div>
      );
    }
    else {
      return (
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          <h1 className="text-3xl">You are the SPY</h1>
        </div>
      );
    }
  }

  const spy = () => {
    if(props.player.id === props.state.spy.id){
      return (
        <div className="flex flex-col mx-6" onClick={setReveal}>
          {revealSpyIcon}
          <span className="mx-auto">Reveal</span>
        </div>
      );
    }
  }

  const isQuestionDone = () => {
    if(props.player.id === props.state.playerTurn.id) {
      return (
         <button className="w-full text-center font-medium bg-button text-white p-2 roudned my-2" onClick={askQuestionDone}>Done</button>
       );
    }
  }

  const handleAskQuestionStarted = useCallback((playerTo: Player) => {
      setVotedPlayer(playerTo);
      setAskingQuestion();
  }, []);

  const handleAskQuestionDone = useCallback(() => {
    setMain();
  }, []);

  const handleVotingStarted = useCallback((fromPlayer: Player, playerTo: Player) => {
    if(fromPlayer.id !== props.player.id) {
      setVoting();
      setVotedPlayer(playerTo);
    }
  }, []);

  const handleVoteComplete = useCallback(() => {
      setVotingResult();
  }, []);

  const handleVotingDone = useCallback(() => {
      setMain();
  }, []);

  const vote = (vote: boolean) => {
    socket.emit("vote", vote, props.gameCode);
  }

  useEffect(() => {
    socket.on("askQuestionStarted", handleAskQuestionStarted);
    socket.on("askQuestionDone", handleAskQuestionDone);
    socket.on("votingStarted", handleVotingStarted);
    socket.on("voteComplete", handleVoteComplete);
    socket.on("votingDone", handleVotingDone);

    return () => {
      socket.off("askQuestionStarted", handleAskQuestionStarted);
      socket.off("askQuestionDone", handleAskQuestionDone);
      socket.off("votingStarted", handleVotingStarted);
      socket.off("voteComplete", handleVoteComplete);
      socket.off("votingDone", handleVotingDone);
    }
  }, [socket, handleVotingStarted, handleVoteComplete, handleVotingDone]);

  const askQuestion = (playerTo: Player) => {
    socket.emit("askQuestion", playerTo, props.gameCode);
  }

  const askQuestionDone = () => {
    socket.emit("askQuestionDone", votedPlayer, props.gameCode);
  }

  const startVoting = (playerTo: Player) => {
    socket.emit("startVote", props.player, playerTo, props.gameCode);
    setVotedPlayer(playerTo);
    setVotingResult();
  }

  const revealSpy = (data:any) => {
    alert(data.environmentGuess);
    socket.emit("revealSpy", data.environmentGuess);
  }

  const showScreen = () => {

    if (screen === "askQuestion") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="text-right w-full" onClick={setMain}>
            {closeIcon}
          </div>
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Ask Question</h1>
            </div>
            <div className="p-4 mt-12">
              {props.state.players.map(( player: Player, index: number) => {
                if(props.player.id !== player.id && props.state.lastPlayer.id !== player.id){
                  return (
                    <div onClick={() => askQuestion(player)} className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded" key={index}>
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
    else if(screen === "askingQuestion") {
      return (

        <div className="fixed bg-background w-full h-full bg-opacity-90 top-0 flex flex-col p-6">
          <div className="bg-primary rounded w-11/12 p-2 my-8 mx-auto">
            <div className="text-white text-center">
              <h1 className="text-4xl">Asking Question</h1>
            </div>
            <div className="p-4 mt-12">
              <div  className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded">
                <h1 className="text-lg uppercase font-bold py-2">{votedPlayer.playerName}</h1>
              </div>
            </div>
            <div className="flex justify-between p-8">
              {isQuestionDone()}
            </div>
          </div>
        </div>

      );
    }
    else if(screen === "vote") {
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
              <div className="flex flex-col" onClick={() => vote(true)}>
                {yesIcon}
                <span className="mx-auto text-gray-400 text-4xl uppercase my-4">yes</span>
              </div>
              <div className="flex flex-col" onClick={() => vote(false)}>
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
              <select className="bg-background p-2 my-2 rounded border text-white" name="environmentGuess" ref={register} placeholder="Guess the envrionment">
                {props.state.environments.map((environment: string, index: number) => {
                  return (
                    <option key={index} value={environment}>{environment}</option>
                  );
                })}
              </select>
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
        {environment()}
        <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-2/3 text-center">
          {props.state.players.map(( player: Player, index: number) => {
            return (
              <div className="w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded" key={index}>
                <h1 className="text-lg uppercase font-bold py-2">{player.playerName}</h1>
              </div>
            )
          })}
        </div>
        {playerTurnMessage()}
      </div>
      <div className="bg-primary rounded text-white mx-auto my-8 p-2 w-11/12 flex justify-center">
        <div className="flex flex-col mx-6" onClick={setVote}>
          {voteIcon}
          <span className="mx-auto">Vote</span>
        </div>
        {spy()}
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
