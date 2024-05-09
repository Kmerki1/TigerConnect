const express = require('express');
const router = express.Router(); 
const message = require('../models/messagesModel'); 

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


router 