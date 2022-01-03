import { useEffect } from "react"

const PlayerStats = ({ visible, setVisible, player }) => {

    useEffect(() => {
        console.log("PLAYER", player)
    }, [player])

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
        if (handsPlayed.ROCK >= handsPlayed.PAPER && handsPlayed.ROCK >= handsPlayed.SCISSORS ) {
            return "ROCK"
        } else if (handsPlayed.PAPER >= handsPlayed.ROCK && handsPlayed.PAPER >= handsPlayed.SCISSORS ) {
            return "PAPER"
        } else {
            return "SCISSORS"
        }
    }

    return (
        <span>
            <h3>Games won: {stats?.gamesWon}</h3>
            <h3>Number of matches: {stats?.gamesPlayed}</h3>
            <h3>Most played hand: {stats && mostPlayedHand(stats.handsPlayed)}</h3>
        </span>
    )
}

const BackButton = ({ handleClick }) => {
    return (
        <div className="back-button" onClick={handleClick}>❮</div>
    )
}

export default PlayerStats