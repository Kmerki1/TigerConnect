const mongoose = require('mongoose'); 

const groupChatMessageSchema = new mongoose.Schema({
    // The name of the group caht (Key) that the message is tied to. 
    chatName: {type: String, require: true}, 
    // Sender of the meesage. And the sender is a user from the user table. 
    senderDisplayName : {type: String, required: true},
    // The message the user wants to send to the group chat. 
    message: {type: String}
}, {timestamps: true}); 

const groupMessage = mongoose.model('groupMessage', groupChatMessageSchema); 

module.exports = groupMessage; 