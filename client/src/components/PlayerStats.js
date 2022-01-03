const PlayerStats = ({ visible, setVisible, player }) => {
    return (
        <div className={visible ? "player-stats-component visible" : "player-stats-component hidden"}>
            <h3>Player Stats for {player}</h3>
            <button onClick={() => setVisible(false)}>close</button>
        </div>
    )
}

export default PlayerStats