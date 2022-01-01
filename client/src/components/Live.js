import { useEffect, useState } from 'react'
import axios from 'axios'
import GameInfo from './GameInfo'

const Live = () => {
    const [games, setGames] = useState([])

    const link = "ws://bad-api-assignment.reaktor.com/rps/live"

    useEffect(() => {
        const socket = new WebSocket(link)

        const gamesIncludeNewGame = (id) => {
            return games.map(g => g.gameId).includes(id)
        }

        const replaceGameInGames = (id, newGame) => {
            const arr_idx = games.findIndex(g => g.gameId === id)
            const newArray = games
            newArray[arr_idx] = newGame
            return newArray
        }

        socket.onmessage = ({ data }) => {
            const parsed = JSON.parse(JSON.parse(data))
            const newGame = { ...parsed, time: new Date() }
            const id = newGame.gameId
            if (!gamesIncludeNewGame(id)) {
                setGames(games.concat(newGame))
            } else {
                const newArray = replaceGameInGames(id, newGame)
                setGames(newArray)
            }
        }
        return () => {
            socket.close()
        }
    }, [games])


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const url = "http://localhost:3001/api/history"
    //         const result = await axios.get(url)
    //         console.log(result.data);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="live-component-container">
            <h2>LIVE</h2>
            {games.sort((g1, g2) => g1.time - g2.time).map(game => {
                return (
                    <div key={game.gameId}>
                        <GameInfo game={game} />
                    </div>
                )
            })}
        </div>
    )
}


export default Live