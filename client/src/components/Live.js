import { useEffect } from 'react'
import axios from 'axios'

const Live = () => {
    const ws = "ws://bad-api-assignment.reaktor.com/rps/live"
    const socket = new WebSocket(ws)

    socket.onmessage = ({ data }) => {
        console.log("message from socket: ", data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://localhost:3001/api/history"
            const result = await axios.get(url)
            console.log(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="live-component-container">
            <h2>LIVE</h2>
        </div>
    )
}

export default Live