import MenuButton from "./MenuButton"
import axios from 'axios'
import { useEffect, useState } from "react";

/*
The historical results must include all games that a player has played 
and it must also include the following aggregate data: 
    win ratio, 
    total number of matches played, 
    and the most played hand (rock, paper, or scissors).
*/

const Search = ({ show, setShow }) => {

    const [cursors, setCursors] = useState([])
    const [games, setGames] = useState([])
    const [players, setPlayers] = useState([])
    const [filter, setFilter] = useState("")

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
        console.log("PLAYER CLICKED", player)
    }

    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            <input
                className="search-input"
                type="text"
                placeholder="Search by name"
                onChange={e => handleInputChange(e.target.value)} />
            {/* {games.map(g => <div>{g.gameId}</div>)} */}
            {players.sort().map(p => {
                return filter.length >= 0
                    && p.toLowerCase().includes(filter.toLowerCase())
                    && <div
                        className="player-search-item"
                        onClick={() => handlePlayerClick(p)}
                        key={p}>{p}
                    </div>
            })}
        </div>
    )
}

export default Search