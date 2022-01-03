/*
The historical results must include all games that a player has played 
and it must also include the following aggregate data: 
    win ratio, 
    total number of matches played, 
    and the most played hand (rock, paper, or scissors).
*/

const PlayerStats = ({ visible, setVisible, player }) => {
    return (
        <div className={visible ? "player-stats-component visible" : "player-stats-component hidden"}>
            <h3>Player Stats for {player}</h3>
            <button onClick={() => setVisible(false)}>close</button>
        </div>
    )
}

export default PlayerStats