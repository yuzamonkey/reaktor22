import { useEffect, useState } from 'react'
import axios from 'axios'

const Live = () => {
    const [games, setGames] = useState([])

    const link = "ws://bad-api-assignment.reaktor.com/rps/live"

    useEffect(() => {
        const socket = new WebSocket(link)
        socket.onmessage = ({ data }) => {
            const newGame = JSON.parse(JSON.parse(data)) //ok
            console.log(newGame.gameId)
            //setGames(games.concat(newGame))
            setGames(games.concat(newGame))
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