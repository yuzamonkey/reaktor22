import { useEffect, useState } from 'react'
import { WS_URL } from '../../utils/constants'
import GameInfo from './GameInfo'

const Live = () => {
    const [games, setGames] = useState([])
    const maxNumOfGames = 100

    useEffect(() => {
        const socket = new WebSocket(WS_URL)

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
            if (gamesIncludeNewGame(id)) {
                setGames(replaceGameInGames(id, newGame))
            } else {
                if (games.length > maxNumOfGames) {
                    setGames(games.slice(0, Math.floor(maxNumOfGames * 0.8)).concat(newGame))
                } else {
                    setGames(games.concat(newGame))
                }
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
        else if (g1.type === "GAME_RESULT") {
            return g2.t - g1.t
        }
    }

    return (
        <div className="live-component-container">
            <h2>LIVE</h2>
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