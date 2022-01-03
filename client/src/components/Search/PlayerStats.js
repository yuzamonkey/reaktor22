import { useEffect } from "react"

const PlayerStats = ({ visible, setVisible, player }) => {

    useEffect(() => {
        console.log("PLAYER", player)
    }, [player])

    return (
        <div className={visible ? "player-stats-component visible" : "player-stats-component hidden"}>
            <h1>{player}</h1>
            <Stats />
            <BackButton handleClick={() => setVisible(false)} />
        </div>
    )
}

const Stats = () => {
    return (
        <span>
            <h3>Win ratio: </h3>
            <h3>Number of matches: </h3>
            <h3>Most played hand: </h3>
        </span>
    )
}

const BackButton = ({ handleClick }) => {
    return (
        <div className="back-button" onClick={handleClick}>❮</div>
    )
}

export default PlayerStats