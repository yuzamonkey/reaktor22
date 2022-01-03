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

    const [nextCursor, setNextCursor] = useState("")

    useEffect(() => {
        let playersFromStorage = []
        for (let i = 0; i < localStorage.length; i++) {
            const playerName = localStorage.key(i);
            playersFromStorage.push(playerName)
        }
        setPlayers(playersFromStorage)
        console.log("END READING FROM STORAGE")
    }, [])

    useEffect(() => {
        console.log("START DATA FETCH")

        const saveDataToStorage = (cursor, game) => {
            const updateStorage = (name, gameParams) => {
                if (localStorage.getItem(name) === null) {
                    const newArr = [gameParams]
                    localStorage.setItem(name, JSON.stringify(newArr))
                } else {
                    const arr = JSON.parse(localStorage.getItem(name))
                    const newArr = arr.concat(gameParams)
                    localStorage.setItem(name, JSON.stringify(newArr))
                }
            }

            const gameParams = { cursor: cursor, gameId: game.gameId }
            updateStorage(game.playerA.name, gameParams)
            updateStorage(game.playerB.name, gameParams)
        }

        const updatePlayersList = (playerList) => {
            for (let p of playerList) {
                if (!players.includes(p)) {
                    setPlayers(players.concat(p))
                }
            }
        }
        
        const fetchData = async () => {
            if (cursors.length === 0) {
                const url = `http://localhost:3001/api/history/`
                const result = await axios.get(url)
                const nextCursor = result.data.cursor.split("=")[1]
                setCursors(cursors.concat(nextCursor))
            } else {
                const currentCursor = cursors[cursors.length - 1]
                const url = `http://localhost:3001/api/history/${currentCursor}`
                const result = await axios.get(url)

                const games = result.data.data
                for (let game of games) {
                    saveDataToStorage(currentCursor, game)
                    updatePlayersList([game.playerA.name, game.playerB.name])
                }

                const nextCursor = result.data.cursor.split("=")[1]
                setCursors(cursors.concat(nextCursor))
            }
        }
        fetchData()

    }, [cursors]);

    const handleInputChange = (value) => {
        setFilter(value)
    }

    const handlePlayerClick = (player) => {
        setShowPlayerStats(true)
        setSelectedPlayer(player)
    }

    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <PlayerStats visible={showPlayerStats} setVisible={setShowPlayerStats} player={selectedPlayer} />
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            <FilterInput handleChange={handleInputChange} />
            <PlayerList players={players} filter={filter} handleClick={handlePlayerClick} />
        </div>
    )
}

const FilterInput = ({ handleChange }) => {
    return (
        <input
            className="search-input"
            type="text"
            placeholder="Search by name"
            onChange={e => handleChange(e.target.value)} />
    )
}

const PlayerList = ({ players, filter, handleClick }) => {
    return (
        <div className="player-list">
            {players.sort().map(p => {
                return p.toLowerCase().includes(filter.toLowerCase())
                    && <div
                        className="player-search-item"
                        onClick={() => handleClick(p)}
                        key={p}>{p}
                    </div>
            })}
        </div>
    )
}

export default Search