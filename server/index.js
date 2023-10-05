const express = require('express') // Import express
const { createServer } = require('http')
const { Server } = require("socket.io");

const app = express() // Initialize express
const httpServer = createServer(app) // Create a server


const origin = "https://test-socket-eta.vercel.app"


const io = new Server(httpServer, {
    cors: {
        origin: origin,
        credentials: true
    }
});
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

        // Lắng nghe sự kiện khi đường dẫn của user A thay đổi
        socket.on('changeRoute', (newRoute) => {
            // Gửi sự kiện đến tất cả client (bao gồm cả user B) để cập nhật đường dẫn
            io.emit('updateRoute', newRoute);
        });

    })
    socket.on('navigateTo', (path) => {
        // Phát sóng sự kiện cho tất cả các kết nối khác để định tuyến
        socket.broadcast.emit('redirectTo', path);
    });

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
httpServer.listen(port, () => console.log(`Listening on port ${port}`))


