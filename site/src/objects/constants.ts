 export const ENDPOINT : string = "http://localhost:8080";

 export interface State{
     stage: string;
     roundTime: Time;
     playerHost: string;
     players: Player[];
     spy: string;
     playerCount: number;
     playerTurn: string;
     lastPlayer: string;
     removedPlayers: number[];
     environments: string[];
     environment: string;
 }

 export const initState : State = {
     stage: "init",
     roundTime: {minutes: 0, seconds: 0},
     playerHost: "",
     players: [],
     spy: "",
     playerCount: 0,
     playerTurn: "",
     lastPlayer: "",
     removedPlayers: [],
     environments: [],
     environment: "",
 }

 export const playerRigged : Player = {
    id: "dkjfkajdf",
    playerName: "Ricardo",
    score: 0,
 }

 export const initStateRigged : State = {
     stage: "play",
     roundTime: { minutes: 10, seconds: 59 },
     playerHost: "dkjfkajdf",
     players: [
         {
            id: "dkjfkajdf",
            playerName: "Ricardo",
            score: 0,
         },
         {
            id: "jkfjakfjads",
            playerName: "Carolina",
            score: 0,
         },
         {
            id: "iwqeukfjdal",
            playerName: "Henrique",
            score: 0,
         },
         {
            id: "dkfjlhlkdsahal",
            playerName: "Diogo",
            score: 0,
         }
     ],
     spy: "dkfjlhlkdsahal",
     playerCount: 4,
     playerTurn: "dkjfkajdf",
     lastPlayer: "",
     removedPlayers: [],
     environments: ["Airplane", "Beach", "Circus Tent", "Day Spa", "Hospital", "Military Base", "Pirate Ship", "Police Station", "School", "Space Station", "Supermarket", "University", "Bank", "Cathedral", "Corporate Party", "Casino", "Hotel", "Movie Studio", "Passenger Train", "Polar Station", "Restaurant", "Service Station", "Submarine", "Theater", "World War II Squad"],
     environment: "Airplane",
 }
 

 export interface Player {
     id: string;
     playerName: string;
     score: number;
 };

 interface Time {
     minutes: number;
     seconds: number;
 }


