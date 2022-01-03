const PlayerStats = ({ visible, setVisible, player }) => {
    return (
        <div className={visible ? "player-stats-component visible" : "player-stats-component hidden"}>
            <h1>{player}</h1>
            <h3>Win ratio: </h3>
            <h3>Total number of matches: </h3>
            <h3>Most played hand: </h3>
            <BackButton handleClick={() => setVisible(false)} />
        </div>
    )
}

const BackButton = ({ handleClick }) => {
    return (
        <div className="back-button" onClick={handleClick}>❮</div>
    )
}

export default PlayerStats