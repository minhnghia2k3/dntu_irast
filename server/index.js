const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express() // Initialize express
const server = http.createServer(app) // Create a server
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
}) // Initialize socketIO

// Listen for a connection
io.on('connection', socket => {
    console.log('User connected')

    /*NOTE:
    - socket. -> specific user
    - io. -> broadcast to all users*/

    // Listen when user A click connect
    socket.on('connectToB', () => {
        console.log('User A click connect to B')
        // Emit broadcast event -> user A want to connect
        io.emit('requestConnection', socket.id)

        // Listen when user A scroll
        socket.on('scrollTo', (position) => {
            // Emit broadcast to all user except user A
            socket.broadcast.emit('scrollTo', position)
        })
    })
    socket.on('disconnectToB', () => {
        console.log('User A click disconnect to B')
        // Emit broadcast event -> user A want to disconnect
        io.emit('requestDisconnect', socket.id)
    })

    // Listen for a disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

// Using route
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Start the server
const port = 8080
server.listen(port, () => console.log(`Listening on port ${port}`))


