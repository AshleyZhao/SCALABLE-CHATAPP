const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const GroupChatMessage = require("./dbSchema/GroupChatMessage");
const OneOnOneChatMessage = require("./dbSchema/OneOnOneChatMessage");

const app = express();

app.use(cors({
    origin: '*'
}));

const server = http.createServer(app);
const io = socketIo(server, {
    cors : {
        origin: '*'
    }
});

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/aztest-scalablechat', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

app.get();

const users = {};
io.on('connection', (socket) => {
    console.log('New user connected ->', socket.id);
    socket.on('setUsername', (username) => {
        users[username] = socket;
        console.log(`Username set for ${socket.id}: ${username}`);
    })
});

io.on('connection', (socket) => {
    console.log('New user connected -> ', socket.id);
    users[socket.id] = socket;

    socket.on('message', async (data) => {
        const message = {
            senderId: socket.id,
            content : data.content
        }
        await message.save();
        io.emit('message', message)
    });

    socket.on('privateMessage', async (data) => {
        const {username, content, senderId} = data;
        const message = new OneOnOneChatMessage({
            senderId: senderId,
            receiverId: username,
            content: content
        });
        
        if(receiverSocket){
            const result = {
                senderId: senderId,
                content: content
            };
            receiverSocket.emit('privateMessage', result);
        }else{
            console.log("User is offline");
        }
    });

    socket.on('disconnect',() => {
        console.log("User disconnected");
        delete users[socket.id];
    })

});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>{
    console.log(`Server running on port ${4000}`);
});