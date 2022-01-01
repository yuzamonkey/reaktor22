import { useEffect, useState } from 'react'
import axios from 'axios'

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
            const newGame = JSON.parse(JSON.parse(data))
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
            {games.map(g => <div>{g.gameId}</div>)}
        </div>
    )
}


export default Live