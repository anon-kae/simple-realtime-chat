import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*'}})

io.on('connection', (socket) => {
  console.log(`User[${socket.id.substr(0, 2)}] connected`)

  socket.on('message', (msg) => {
    io.emit('message', `${socket.id.substr(0, 2)}: ${msg}`)
  })

  socket.on('disconnect', () => {
    console.log(`User[${socket.id.substr(0, 2)}] disconnected`)
  })
})

app.get('/', (req, res) => {
  res.send(`[${new Date().toDateString}]: REALTIME CHAT SERVICE is running`)
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`REALTIME CHAT SERVICE [HTTP] is running on port [${PORT}]`)
})

const WS_PORT = process.env.WS_PORT || 3031
server.listen(WS_PORT, () => {
  console.log(`REALTIME CHAT SERVICE [WS] is running on port [${WS_PORT}]`)
})

export default app