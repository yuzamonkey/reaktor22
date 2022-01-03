import axios from 'axios'
import { useEffect, useState } from "react";
import MenuButton from '../Utility/MenuButton';
import PlayerStats from './PlayerStats';

const Search = ({ show, setShow }) => {
    //
    const [players, setPlayers] = useState([])
    const [filter, setFilter] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState("")
    const [showPlayerStats, setShowPlayerStats] = useState(false)
    //

    const [cursors, setCursors] = useState([])
    const [games, setGames] = useState([])

    useEffect(() => {
        // handle cursors from local storage
        let gamesFromStorage = []
        let playersFromStorage = []
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const cursor = localStorage.key(i);
                const data = JSON.parse(localStorage.getItem(cursor))
                const gamesFromData = data.data
                gamesFromStorage = gamesFromStorage.concat(gamesFromData)

                for (let game of gamesFromData) {
                    const p1 = game.playerA.name
                    const p2 = game.playerB.name
                    if (!playersFromStorage.includes(p1)) {
                        playersFromStorage.push(p1)
                    }
                    if (!playersFromStorage.includes(p2)) {
                        playersFromStorage.push(p2)
                    }

                }
            }
            setGames(gamesFromStorage)
            setPlayers(playersFromStorage)
        }
    }, [])

    // useEffect(() => {
    //     // get new data
    //     // const handleData = (data) => {
    //     // }
    //     console.log("START")
    //     const fetchData = async () => {
    //         const currentCursor = cursors.length > 0 ? cursors[cursors.length - 1] : "first"

    //         let url = currentCursor === "first"
    //             ? `http://localhost:3001/api/history/`
    //             : `http://localhost:3001/api/history/${currentCursor}`

    //         const result = await axios.get(url)

    //         const nextCursor = result.data.cursor.split("=")[1]

    //         localStorage.setItem(currentCursor, JSON.stringify(result.data))

    //         setCursors(cursors.concat(nextCursor))
    //     }
    //     fetchData()
    //     //}, [cursors]);
    // }, []);

    const handleInputChange = (value) => {
        setFilter(value)
    }

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player)
        setShowPlayerStats(true)
    }

    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <PlayerStats visible={showPlayerStats} setVisible={setShowPlayerStats} player={selectedPlayer} />
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            <input
                className="search-input"
                type="text"
                placeholder="Search by name"
                onChange={e => handleInputChange(e.target.value)} />
            {/* {games.map(g => <div>{g.gameId}</div>)} */}
            <div className="player-list">
                {players.sort().map(p => {
                    return p.toLowerCase().includes(filter.toLowerCase())
                        && <div
                            className="player-search-item"
                            onClick={() => handlePlayerClick(p)}
                            key={p}>{p}
                        </div>
                })}
            </div>
        </div>
    )
}

export default Search