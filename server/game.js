const createGameState = (gameData) => {
    return {
        stage: "CREATE",
        roundTime: gameDate.roundTime,
        playerHost: gameData.playerhost,
        players: [gameDate.playerhost],
        playerCount: gameDate.playercount,
        spy: '',
        playerTurn: '',
        lastPlayer: '',
        removedPlayers: []
    }
}

module.exports = {
    createGameState,
}
