const mongoose = require('mongoose');

const oneOnOneChatMessageSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    content: String,
    createdAt: {type: Date, default: Date.now },
})

const oneOnOneChatMessage = mongoose.model('OneOnOneChatMessage', oneOnOneChatMessageSchema);

module.exports = oneOnOneChatMessage;