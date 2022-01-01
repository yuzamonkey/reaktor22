import { useEffect } from 'react'
import axios from 'axios'


const MainWindow = () => {
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

    return <div>
        <h2>Main win</h2>
    </div>
}

export default MainWindow