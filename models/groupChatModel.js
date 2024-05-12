const mongoose = require('mongoose'); 
const groupMessages = require('./groupChatMessagesModel'); 

const groupChatSchema = new mongoose.Schema({
    // name of the chat
    chatName: {type: String, required: true}, 
    // list of members in the chat (username)
    members: [ {type: String, require: true} ], 

   
}, {timestamps: true}); 

const groupChat = mongoose.model('groupChat', groupChatSchema); 

module.export = groupChat(); 