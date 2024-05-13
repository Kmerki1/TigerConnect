const express = require('express'); 
const router = express.Router();
const groupChat = require('../models/groupChatModel');
const groupMessage = require('../models/groupChatMessagesModel');

router.post('/groupchats', async (req, res) =>{
console.log('in route')
    const newGroupChat = new groupChat({
        chatName: req.body.chatName, 
        members: req.body.members
    });

    const newGC = await newGroupChat.save();
    res.status(201).json(newGC);
});


router.get('/groupChatsUser/:userId', async (req, res) =>{
    const userId = req.params.userId;
    try {
        const groupChats = await groupChat.find({ members: {$in: [userId] } });
        res.json(groupChats);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch group chats", error: error.message });
    }
});

router.get('/group/:chatName/getMessages', async (req, res) =>{
    const theGroupChat = await groupChat.findOne({ chatName: req.params.chatName });
    if(!theGroupChat){
        return res.status(404).json({ message: 'No such group in DB' });
    }

    const messages = await groupMessage.find({ chatName: req.params.chatName });
    res.json(messages);
});

router.post('/group/:chatName/addMessages', async (req, res) => {
    console.log(req.params.chatName)
    // see if the GC exists and if not return a 404 error to the user.
    const theGroupChat = await groupChat.findOne({ chatName: req.params.chatName });
    if(!theGroupChat){
        return res.status(404).json({ message: 'No such group in DB' });
    }

    const msg = new groupMessage({
        chatName: req.params.chatName,
        senderDisplayName: req.body.senderDisplayName,
        message: req.body.message
    });

    const newMsg = await msg.save();

});

router.get('groupChats/:chatName', async (req, res) =>{ 
    const cName = req.params.chatName; 

    if(!cName){
        return res.status(404).json({message: 'No such chat name was found in the DB.'})
    }
    
    // search for all of the groupchats the user is part of. 
    // REMINDER: the members field is a LIST of usernames, not a single value. 
    const groupChats = await groupChat.findOne({ chatName: cName }); 

    res.json(groupChat)
    
});


module.exports = router; 
