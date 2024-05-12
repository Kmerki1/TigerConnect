const express = require('express');
const router = express.Router(); 
const message = require('../models/messagesModel'); 


// Sending messages between users
router.post('messages/send', async (req, res) =>{
    
    const newMessage = new message({
        sender: req.body.sender, 
        receiver: req.body.receiver, 
        content: req.body.content
    }); 

    const saveMsg = await newMessage.save(); 

    res.json(saveMsg); 
    
}); 


// Get the messages between a sender and a receiver
router.get('/messages', async (req, res) => {
    // receive the users that we are trying to get the messages for
    const sender = req.query.sender; // sender
    const receiver = req.query.receiver; // receiver

    // Make sure 
    if(!receiver || !sender){
        return res.status(400).json({error: "Sender and receiver not found in the DB"}); 
    }

    const messages = await message.find({
        'sender.userName': sender, 
        'receiver.userName': receiver
    }); 
    res.json(message)
}); 


module.exports = router; 