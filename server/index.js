const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express() // Initialize express
const server = http.createServer(app) // Create a server

const cors = require('cors');

const corsOptions = {
    origin: 'https://test-socket-eta.vercel.app', // Đặt URL của trang web của bạn ở đây
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

const io = socketIO(server) // Initialize socketIO

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
server.listen(port, () => console.log(`Listening on port ${port}`))


