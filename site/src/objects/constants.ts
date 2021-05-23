 export const ENDPOINT : string = "http://192.168.1.121:8080";
 export const ENDPOINT_LOCAL : string = "http://localhost:8080";

 export interface State{
     stage: string;
     gamePhase: string;
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
     voting: Vote;
     votingHistory: Vote[];
 }

 export const initState : State = {
     stage: "init",
     gamePhase: "main",
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
     voting: {from : "", to: "", playersVoted: 0, yes:0, no:0 },
     votingHistory: [],
 }

 export const blankPlayer : Player = {
    id: "",
    playerName: "",
    score: 0,
 }

 export const playerRigged : Player = {
    id: "dkjfkajdf",
    playerName: "Ricardo",
    score: 0,
 }

 export const initStateRigged : State = {
     stage: "play",
     gamePhase: "main",
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
     voting: {
         from : "fdkaj",
         to: "fdkajfk",
         playersVoted: 2,
         yes: 2,
         no: 0,
    },
    votingHistory: [],
 }
 

 export interface Player {
     id: string;
     playerName: string;
     score: number;
 };

 export interface Vote {
     from: string,
     to: string,
     playersVoted: number,
     yes: number,
     no: number,
 }

 interface Time {
     minutes: number;
     seconds: number;
 }


