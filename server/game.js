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
        voting: []
    }
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

    return state.voting.push(voting);
}

const isVotingDone = (state) => {
    if(state.voting[state.voting.length - 1] === state.playerCount - 1) return true;
    else return false;
}

const vote = (vote, state) => {
    let voting = state.voting[state.voting.length - 1];

    if(vote === 'yes') voting.yes += 1;
    else voting.no += 1;

    voting.playersVoted += 1 ;

    state.voting[state.voting.length - 1] = voting;

    return state;
}

module.exports = {
    createGameState,
    updateState,
    gameLoop,
    moveTurn,
    isVotingDone,
    vote,
}
