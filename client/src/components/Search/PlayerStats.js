const PlayerStats = ({ visible, setVisible, player }) => {

    return (
        <div className={visible ? "player-stats-component visible" : "player-stats-component hidden"}>
            <h1>{player}</h1>
            <Stats name={player} />
            <BackButton handleClick={() => setVisible(false)} />
        </div>
    )
}

const Stats = ({ name }) => {
    const stats = JSON.parse(localStorage.getItem(name))

    const mostPlayedHand = (handsPlayed) => {
        if (handsPlayed.ROCK >= handsPlayed.PAPER && handsPlayed.ROCK >= handsPlayed.SCISSORS) {
            return "ROCK"
        } else if (handsPlayed.PAPER >= handsPlayed.ROCK && handsPlayed.PAPER >= handsPlayed.SCISSORS) {
            return "PAPER"
        } else {
            return "SCISSORS"
        }
    }

    const getWinPercent = () => {
        if (stats) {
            const gp = Math.max(stats.gamesPlayed, 0.0000001)
            return ((stats.gamesWon / gp) * 100).toFixed(1)
        } return null
    }

    const getWinRatio = () => {
        if (stats) {
            const won = stats.gamesWon
            const gp = stats.gamesPlayed
            return (won / (gp - won)).toFixed(2)
        } return null
    }

    return (
        <span className="player-stats">
            <h3>Games won: <b>{stats?.gamesWon}</b></h3>
            <h3>Winning percentage: <b>{getWinPercent()}%</b></h3>
            <h3>Win ratio (wins/ties+losses): <b>{getWinRatio()}</b></h3>
            <h3>Number of games: <b>{stats?.gamesPlayed}</b></h3>
            <h3>Most played hand: <b>{stats && mostPlayedHand(stats.handsPlayed)}</b></h3>
        </span>
    )
}

const BackButton = ({ handleClick }) => {
    return (
        <div className="back-button" onClick={handleClick}>❮</div>
    )
}

export default PlayerStats