const express = require('express'); 
const router = express.Router();
const groupChat = require('../models/groupChatModel'); 

// Create a new group chat 
router.post('/groupchats', async (req, res) =>{

    const groupChat = new groupChat({
        chatName: req.body.chatName, 
        members: req.body.members
    });

    const newGC = await groupChat.save(); 
    res.json(newGC); 
}); 

// get all group chats that the user is a part of (in the members)
router.get('groupChats/:username', async (req, res) =>{ 
    const username = req.params.username; 

    // search for all of the groupchats the user is part of. 
    // REMINDER: the members field is a LIST of usernames, not a single value. 
    const groupChats = await groupChat.find({ members: {$in: [username] } }); 

    res.json(groupChat)
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
