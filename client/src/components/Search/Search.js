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

    const updatePlayersFromStorage = () => {
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
    }

    useEffect(() => {
        updatePlayersFromStorage()
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
                updatePlayersFromStorage()
            }
        }

        // const nextCursorIsAlreadyHandled = (next, cursors) => {
        //     for (let c of cursors) {
        //         if (next === c.first) {
        //             return true
        //         }
        //     }
        //     return false
        // }

        const updateCursors = (current, next, cursors) => {
            const updatedCursors = cursors.map(obj => {
                if (current === obj.next) {
                    return { ...obj, to: current, next: next }
                }
                return obj
            })

            let removeList = []

            const objIsToBeRemoved = (obj, removeList) => {
                for (let item of removeList) {
                    if (obj.from === item.from
                        && obj.to === item.to
                        && obj.next === item.next) {
                        return true
                    }
                }
                return false
            }

            const joined = updatedCursors.map(obj => {
                const toJoin = updatedCursors.filter(c => obj.next === c.from)[0]
                if (toJoin) {
                    removeList.push(toJoin)
                    const joinedObj = {
                        from: obj.from,
                        to: toJoin.to,
                        next: toJoin.next
                    }
                    return joinedObj
                }
                return obj
            })

            const filteredCursors = joined.filter(c => c !== undefined && !objIsToBeRemoved(c, removeList))
            return filteredCursors
        }

        const fetchData = async () => {
            const result = await axios.get(API_URL + currentCursor)
            const nextCursor = result.data.cursor === null ? null : result.data.cursor.split("=")[1]

            // first page of api, move to next page
            if (currentCursor === "") {
                setCurrentCursor(nextCursor)
                return
            }

            // last page of api
            if (nextCursor === null) {
                return
            }

            // update storage from api data
            const games = result.data.data
            for (let game of games) {
                updateStorage(game)
            }

            const cursorsFromStorage = JSON.parse(localStorage.getItem("cursors"))

            if (cursorsFromStorage === null) {
                const cursors = [{
                    from: currentCursor,
                    to: currentCursor,
                    next: nextCursor
                }]
                localStorage.setItem("cursors", JSON.stringify(cursors))
                setCurrentCursor(nextCursor)
                return
            } else {
                //jatka tästä, uusi api sivu ei liitä vanhempiin
                const updatedCursors = updateCursors(currentCursor, nextCursor, cursorsFromStorage)
                localStorage.setItem("cursors", JSON.stringify(updatedCursors))
                setCurrentCursor(updatedCursors[0].next)
            }
        }
        fetchData()
    }, [currentCursor]);

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