 export const ENDPOINT : string = "http://localhost:8080";

 export interface State{
     stage: string;
     roundTime: number;
     playerHost: number;
     players: Player[];
     spy: number;
     playerCount: number;
     playerTurn: number;
     lasPlayer: number;
     removedPlayers: number[];
 }

 export const initState : State = {
     stage: "init",
     roundTime: 0,
     playerHost: 0,
     players: [],
     spy: 0,
     playerCount: 0,
     playerTurn: 0,
     lasPlayer: 0,
     removedPlayers: []
 }
 

 export interface Player {
     id: number;
     playerName: string;
 };


