import { useEffect, useState } from 'react'
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
                setGames(replaceGameInGames(id, newGame))
            }
        }
        return () => {
            socket.close()
        }
    }, [games])




    const sortedGames = (g1, g2) => {
        if (g1.type !== g2.type) {
            return g1.type === "GAME_RESULT" ? -1 : 1
        }
        return g2.time - g1.time
    }

    return (
        <div className="live-component-container">
            <h2>LIVE</h2>
            {/* {games.sort((g1, g2) => g2.time - g1.time).map(game => { */}
            {games.sort(sortedGames).map(game => {
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