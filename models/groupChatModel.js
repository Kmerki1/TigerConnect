const mongoose = require('mongoose'); 
const groupMessages = require('./groupChatMessagesModel'); 

const groupChatSchema = new mongoose.Schema({
    chatName: {type: String, required: true}, 
    // The bellow code indicates that the members should contain an object and that 
    // those objects can be found in the 'user' collection in the DB. 
    // hold them all in a list
    // make a list of messages
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}], 
    // list of mesasges that are tied to the groupchat
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: groupMessages}]
   
}, {timestamps: true}); 

const groupChat = mongoose.model('groupChat', groupChatSchema); 

module.export = groupChat(); 