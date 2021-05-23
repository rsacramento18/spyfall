const { ENVIRONMENTS } = require('./constants');
const { randomNumber } = require('./utils');

const createGameState = (gameData, player) => {
    return {
        stage: "waiting",
        roundTime: {minutes: gameData.roundTime, seconds:0},
        roundNumber: 1,
        playerHost: player,
        players: [player],
        playerCount: parseInt(gameData.playerCount),
        spy: '',
        playerTurn: '',
        lastPlayer: '',
        removedPlayers: [],
        voting: {}
    }
}

const createGameStateRigged = (player) => {

    return {
        stage: "waiting",
        roundTime: {minutes: 10, seconds:0},
        roundNumber: 1,
        playerHost: player,
        players: [player, {id:"2", playerName:"Carolina", score:0},{id:"3", playerName:"Henrique", score:0},{id:"4", playerName:"Diogo", score:0}],
        playerCount: parseInt(4),
        spy: '',
        playerTurn: '',
        lastPlayer: '',
        removedPlayers: [],
        voting: {}
    }
}

const initGame = (state) => {
    state.environments = ENVIRONMENTS;

    let spy = randomNumber(state.playerCount);
    let environment = randomNumber(state.environments.length - 1 );
    let playerTurn = randomNumber(state.playerCount);

    state.stage = "play";
    state.spy = state.players[spy];
    state.playerTurn = state.players[playerTurn];
    state.environment = state.environments[environment];

    console.log(state);

    return state;
}

const updateState = (state) => {
    state.roundTime = updateCountDown(state.roundTime);
    return state;
}

const updateCountDown = (time) => {
    let seconds = time.seconds - 1;
    if(seconds < 0){
        if(time.minutes === 0) {
            return {
                minutes: 0, 
                seconds: 0,
            }
        }
        return  {
            minutes: time.minutes -1,
            seconds: 59,
        }
    }
    else if(seconds < 10) {
        return {
            minutes: time.minutes,
            seconds: "0"+seconds,
        }
    }
    else {
        return {
            minutes: time.minutes,
            seconds: seconds,
        }
    }
}

const gameLoop = (state) => {
    if(state.roundTime.minutes === 0 && state.roundTime.seconds === 0) {
        return true;
    }
    return false;
}

const moveTurn = (state, player) => {
    state.lastPlayer = state.playerTurn;
    state.playerTurn = player;

    return state;
}

const startVote = (fromPlayer, toPlayer, state) => {
    let voting = {
        from: fromPlayer,
        to: toPlayer,
        playersVoted: 1,
        yes: 1,
        no: 0,
    }


    state.voting = voting;

    return state;
}

const isVotingDone = (state) => {
    if(state.voting.playersVoted === state.playerCount) return true;
    else return false;
}

const voteAction = (vote, state) => {
    console.log(state);
    console.log(vote);
    console.log(state.voting);

    if(vote === true) state.voting.yes += 1;
    else state.voting.no += 1;

    state.voting.playersVoted += 1 ;

    return state;
}

module.exports = {
    createGameState,
    createGameStateRigged,
    initGame,
    updateState,
    gameLoop,
    moveTurn,
    startVote,
    isVotingDone,
    voteAction,
}
