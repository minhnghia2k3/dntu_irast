import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import companyRoutes from './routes/companyRoute.js';
dotenv.config();

const app = express() // Initialize express
const httpServer = createServer(app) // Create a server

const origin = "http://localhost:3000"

const io = new Server(httpServer, {
    cors: {
        origin: origin,
        credentials: true
    }
});
// Listen for a connection
io.on('connection', socket => {
    /*NOTE:
    - socket. -> specific user
    - io. -> broadcast to all users*/
    // Sign in
    console.log(socket.handshake.headers.pathname)
    socket.on('connect', () => {
        socket.emit('connect')
    })
    socket.on('signIn', (data) => {
        if (data.username === process.env.ACCOUNT && data.password === password) {
            socket.emit('Complete');
        } else {
            socket.emit('error')
        }
    })

    // Gửi tín hiệu tới tất cả các 
    if (socket.handshake.headers.logged === 'logged') {
        console.log('Hello world, Welcome back')
        socket.to('Tivi').emit('redirect', (socket.handshake.headers.pathname))
        console.log('Đã gửi tín hiệu tới room tivi')
    }



    socket.on('JoinTivi', () => {
        socket.join('Tivi')
        console.log('join tivi')
    })

    // Redirect in Main
    socket.on('RedirectToPath', data => {
        socket.to('Tivi').emit('redirect', data)
    })
    // Listen when user A click connect
    socket.on('connectToB', () => {
        console.log('User A click connect to B')

        // Emit broadcast event -> user A want to connect
        io.emit('requestConnection', socket.id)

        // Listen when user A scroll
        socket.on('scrollTo', (position) => {
            // Emit broadcast to all user except user A
            socket.broadcast.emit('scrollTo', position * 2)
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

// Routing
app.get('/', (req, res) => {
    res.send('Hello world')
})
app.use('/api/companies', companyRoutes);

// Start the server
const port = 8080
httpServer.listen(port, () => console.log(`Listening on port ${port}`))