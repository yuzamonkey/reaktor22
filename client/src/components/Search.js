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

    useEffect(() => {
        let storageCursors = []
        let storageGames = []
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const cursor = localStorage.key(i);
                storageCursors.push(cursor)

                const data = JSON.parse(localStorage.getItem(cursor))
                const games = data.data
                storageGames = storageGames.concat(games)
            }
            setCursors(storageCursors)
            setGames(storageGames)
        }
    }, [])

    useEffect(() => {
        // const handleData = (data) => {
        // }
        const fetchData = async () => {
            const currentCursor = cursors.length > 0 ? cursors[cursors.length - 1] : "first"

            let url = currentCursor === "first"
                ? `http://localhost:3001/api/history/`
                : `http://localhost:3001/api/history/${currentCursor}`
            const result = await axios.get(url)
            const data = result.data

            setGames(games.concat(data.data))

            localStorage.setItem(currentCursor, JSON.stringify(data))

            const nextCursor = result.data.cursor.split("=")[1]
            setCursors(cursors.concat(nextCursor))
            // if (!cursors.includes(id)) {
            //     setCursors(cursors.concat(id))
            // } else {
            //     console.log("BREAK")
            // }
        }
        fetchData()
    }, [cursors]);

    const handleInputChange = (value) => {
        console.log(value)
    }

    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            <input
                className="search-input"
                type="text"
                placeholder="Search by name"
                onChange={e => handleInputChange(e.target.value)} />
            {games.map(g => <div>{g.gameId}: {g.playerA.name} vs {g.playerB.name}</div>)}
        </div>
    )
}

export default Search