const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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