const express = require('express');
const cors = require('cors');
const connectToMongodb = require('./config/mongoDb');
const dotenv = require('dotenv');

dotenv.config()

connectToMongodb()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// use a static folder
app.use(express.static('public'))

app.use(cors());

const PORT = process.env.PORT || 5000;

// home route
app.get('/', (req, res) => {
    res.send('Hello World')
});

// avaiable routes
app.use('/', require('./routes/index'))

const server = app.listen(PORT, () => {
    console.log(`node js chat app server is listening on port http://localhost:${PORT}`)
});

// handle cors error
const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: '*'
    }
});
// create a connection
io.on('connection', (socket) => {
    console.log(`connected to socket.io`)
    // socket setup
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected')
    })
    // join room
    socket.on('joinChat', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`)
    })
    // new message
    socket.on('newMessage', (newMessageReceived) => {
        let chat = newMessageReceived.chat;
        // if chat users not found
        if (!chat.users) return console.log(`chat.users not found`)
        // if we are a user, and we are sending message inside a group, we want to send this message to other users of the group except us
        chat.users.forEach(user => {
            // if we are the sender, simply return
            // if(user._id == newMessageReceived.sender._id){
            //     return
            // }
            socket.in(user._id).emit('messageReceived', newMessageReceived)
        })

    })
})