import axios from 'axios'
import { useEffect, useState } from "react";
import { playerWonGame } from '../../logic/rps';
import { API_URL } from '../../utils/constants';
import MenuButton from '../Utility/MenuButton';
import PlayerStats from './PlayerStats';

const Search = ({ show, setShow }) => {
    //
    const [players, setPlayers] = useState([])
    const [filter, setFilter] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState("")
    const [showPlayerStats, setShowPlayerStats] = useState(false)
    //

    const [currentCursor, setCurrentCursor] = useState("")

    useEffect(() => {
        const isName = (str) => {
            return str.split(" ").length === 2
        }

        let playersFromStorage = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (isName(key)) {
                const playerName = localStorage.key(i);
                playersFromStorage.push(playerName)
            }
        }
        setPlayers(playersFromStorage)
        console.log("END READING FROM STORAGE")
    }, [])


    useEffect(() => {
        console.log("START DATA FETCH")

        const updatePlayersList = (name) => {
            if (!players.includes(name)) {
                setPlayers(players.concat(name))
            }
        }

        const updatePlayerStats = (name, played, game) => {
            const won = playerWonGame(name, game)

            if (localStorage.getItem(name) === null) {
                const dataObj = {
                    gamesPlayed: 1,
                    gamesWon: won ? 1 : 0,
                    handsPlayed: {
                        ROCK: played === "ROCK" ? 1 : 0,
                        PAPER: played === "PAPER" ? 1 : 0,
                        SCISSORS: played === "SCISSORS" ? 1 : 0,
                    }
                }
                localStorage.setItem(name, JSON.stringify(dataObj))
            } else {
                const currentStats = JSON.parse(localStorage.getItem(name))
                const newObj = {
                    gamesPlayed: currentStats.gamesPlayed + 1,
                    gamesWon: won ? currentStats.gamesWon + 1 : currentStats.gamesWon,
                    handsPlayed: {
                        ROCK: played === "ROCK" ? currentStats.handsPlayed.ROCK + 1 : currentStats.handsPlayed.ROCK,
                        PAPER: played === "PAPER" ? currentStats.handsPlayed.PAPER + 1 : currentStats.handsPlayed.PAPER,
                        SCISSORS: played === "SCISSORS" ? currentStats.handsPlayed.SCISSORS + 1 : currentStats.handsPlayed.SCISSORS,
                    }
                }
                localStorage.setItem(name, JSON.stringify(newObj))
            }
        }

        const updateStorage = (game) => {
            // updatePlayersList(game.playerA.name)
            // updatePlayersList(game.playerB.name)

            updatePlayerStats(game.playerA.name, game.playerA.played, game)
            updatePlayerStats(game.playerB.name, game.playerB.played, game)

        }


        const fetchData = async () => {
            const firstCursor = localStorage.getItem("firstCursor")
            const lastCursor = localStorage.getItem("lastCursor")

            if (currentCursor !== "") {
                const result = await axios.get(API_URL)
                const cursor = result.data.cursor.split("=")[1]

                if (firstCursor === null) {
                    localStorage.setItem("firstCursor", cursor)
                }
                if (lastCursor === null) {
                    localStorage.setItem("lastCursor", cursor)
                }
                setCurrentCursor(firstCursor)

            } else {
                const result = await axios.get(API_URL + currentCursor)

                const games = result.data.data
                for (let game of games) {
                    updateStorage(game)
                }

                const nextCursor = result.data.cursor.split("=")[1]

                if (firstCursor === lastCursor) {
                    localStorage.setItem("firstCursor", nextCursor)
                    localStorage.setItem("lastCursor", nextCursor)
                } else if (nextCursor === lastCursor) {
                    localStorage.setItem("firstCursor", nextCursor)
                }

                console.log(nextCursor)
            }

        }
        fetchData()

    }, []);

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
            <h1>{players.length}</h1>
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