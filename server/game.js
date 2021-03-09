const createGameState = (gameData) => {
    return {
        stage: "waiting",
        roundTime: gameData.roundtime,
        playerHost: {
            id: 1,
            playerName: gameData.playerhost,
        },
        players: [
            {
                id: 1,
                playerName: gameData.playerhost,
            }
        ],
        playerCount: gameData.playercount,
        spy: '',
        playerTurn: '',
        lastPlayer: '',
        removedPlayers: []
    }
}

module.exports = {
    createGameState,
}
