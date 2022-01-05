import axios from 'axios'
import { useEffect, useState } from "react";
import { playerWonGame } from '../../logic/rps';
import { API_URL } from '../../utils/constants';
import MenuButton from '../Utility/MenuButton';
import PlayerStats from './PlayerStats';

const Search = ({ show, setShow }) => {
    const [players, setPlayers] = useState([])
    const [filter, setFilter] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState("")
    const [showPlayerStats, setShowPlayerStats] = useState(false)

    const [currentCursor, setCurrentCursor] = useState("")

    const updatePlayersNames = () => {
        const isName = (str) => {
            return str.split(" ").length === 2
        }

        let playersFromStorage = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (isName(key)) {
                const playerName = key;
                playersFromStorage.push(playerName)
            }
        }
        setPlayers(playersFromStorage)
    }

    useEffect(() => {
        updatePlayersNames()
    }, [])

    useEffect(() => {
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
            updatePlayerStats(game.playerA.name, game.playerA.played, game)
            updatePlayerStats(game.playerB.name, game.playerB.played, game)
            if (!players.includes(game.playerA.name) || !players.includes(game.playerB.name)) {
                updatePlayersNames()
            }
        }

        const currentHasBeenFetched = (current, cursors) => {
            if (cursors) {
                for (let c of cursors) {
                    if (c.from === current) {
                        return true
                    }
                }
            } return false
        }

        const updateCursors = (current, next, cursors) => {
            if (!cursors) {
                const newObj = {
                    from: current,
                    to: current,
                    next: next
                }
                return [newObj]
            }


            if (currentHasBeenFetched(current, cursors)) {
                return cursors
            }

            const nextHasBeenFetched = () => {
                for (let c of cursors) {
                    if (c.from === next) {
                        return true
                    }
                }
                return false
            }

            const previousHasBeenFetched = () => {
                for (let c of cursors) {
                    if (c.next === current) {
                        return true
                    }
                }
                return false
            }

            if (nextHasBeenFetched()) {
                const currObj = cursors.filter(c => c.next === current)[0]
                const toJoinObj = cursors.filter(c => c.from === next)[0]

                if (currObj) {
                    const newObj = {
                        from: currObj.from,
                        to: toJoinObj.to,
                        next: toJoinObj.next
                    }

                    const newArr = cursors.map(c => {
                        if (c === currObj) {
                            return newObj
                        }
                        if (c === toJoinObj) {
                            return null
                        }
                        return c
                    })
                    return newArr.filter(c => c !== null)
                } else {
                    const newArr = cursors.map(c => {
                        if (c === toJoinObj) {
                            return { ...toJoinObj, from: current }
                        }
                        return c
                    })
                    return newArr.filter(c => c !== null)
                }
            } else if (previousHasBeenFetched()) {
                const newArr = cursors.map(c => {
                    if (current === c.next) {
                        const newObj = {
                            from: c.from,
                            to: current,
                            next: next
                        }
                        return newObj
                    }
                    return c
                })
                return newArr
            } else {
                const newObj = {
                    from: current,
                    to: current,
                    next: next
                }
                return cursors.concat(newObj)
            }
        }

        const fetchData = async () => {
            const result = await axios.get(API_URL + currentCursor)
            const nextCursor = result.data.cursor === null ? null : result.data.cursor.split("=")[1]

            // first page of api
            if (currentCursor === "") {
                setCurrentCursor(nextCursor)
                return
            }

            // last page of api
            if (nextCursor === null) {
                return
            }

            // if data has not been fetched before, update storage from api data
            const cursorsFromStorage = JSON.parse(localStorage.getItem("cursors"))
            if (!currentHasBeenFetched(currentCursor, cursorsFromStorage)) {
                const games = result.data.data
                for (let game of games) {
                    updateStorage(game)
                }
            }
            
            // update cursors
            const updatedCursors = updateCursors(currentCursor, nextCursor, cursorsFromStorage)
            localStorage.setItem("cursors", JSON.stringify(updatedCursors))
            setCurrentCursor(updatedCursors[updatedCursors.length - 1].next)

        }

        fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCursor]);

    const handlePlayerClick = (player) => {
        setShowPlayerStats(true)
        setSelectedPlayer(player)
    }

    return (
        <div className={show ? "search-component-container visible" : "search-component-container hidden"}>
            <PlayerStats visible={showPlayerStats} setVisible={setShowPlayerStats} player={selectedPlayer} />
            <MenuButton handleClick={() => setShow(false)} icon="x" />
            <FilterInput handleChange={(e) => setFilter(e.target.value)} />
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
            onChange={handleChange} />
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