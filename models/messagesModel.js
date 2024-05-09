const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    // Sender of the message has a display name and user name. 
    sender: {
        displayName: {type: String, required: true},
        userName: {type: String, required: true}
    }, 
    receiver: {
        displayName: {type: String, required: true},
        userName: {type: String, required: true}
    }, 
    content: {type: String, required: true}, 
    readNotice: {type: String, default: false},
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema); 