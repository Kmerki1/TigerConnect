const mongoose = require('mongoose'); 

const groupChatMessageSchema = new mongoose.Schema({
    // Sender of the meesage. And the sender is a user from the user table. 
    sender : {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    // The message ther user wants to send to the group chat. 
    message: {type: Sting}
}, {timestamps: true}); 

const groupMessage = mongoose.model('groupMessage', groupChatMessageSchema); 

module.exports = groupMessage; 