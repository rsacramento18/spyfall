 export const ENDPOINT : string = "http://localhost:8080";

 export interface State{
     stage: string;
     roundTime: number;
     playerHost: number;
     players: number[];
     spy: number;
     playerCount: number;
     playerTurn: number;
     lasPlayer: number;
     removedPlayers: number[];
 }
 

 export interface Player {
     player: number, 
     playerName: string
 };


