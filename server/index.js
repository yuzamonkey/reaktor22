const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())

const url = "https://bad-api-assignment.reaktor.com/rps/history"

app.get('/api/history', async (req, res) => {
    const response = await axios.get(url)
    res.send(response.data)
})

app.get('/api/history/:cursor', async (req, res) => {
    const response = await axios.get(url + `?cursor=${req.params.cursor}`)
    res.send(response.data)
})

app.get('/api/history/:cursor/:id', async (req, res) => {
    const response = await axios.get(url + `?cursor=${req.params.cursor}`)
    const games = response.data.data
    const game = games.filter(g => g.gameId === req.params.id)[0]
    res.send(game)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})