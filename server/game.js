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
        removedPlayers: []
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

module.exports = {
    createGameState,
    updateState,
    gameLoop,
}
