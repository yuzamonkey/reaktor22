export const playerWonGame = (name, game) => {
    let playerPlayed = ''
    let opponentPlayed = ''

    if (game.playerA.name === name) {
        playerPlayed = game.playerA.played
        opponentPlayed = game.playerB.played
    } else {
        playerPlayed = game.playerB.played
        opponentPlayed = game.playerA.played
    }

    return (playerPlayed === 'ROCK' && opponentPlayed === 'SCISSORS') ||
        (playerPlayed === 'PAPER' && opponentPlayed === 'ROCK') ||
        (playerPlayed === 'SCISSORS' && opponentPlayed === 'PAPER')
}