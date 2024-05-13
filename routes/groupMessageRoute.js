const express = require('express'); 
const router = express.Router(); 
const groupMessage = require('../models/groupChatMessagesModel'); 
const groupChat = require('../models/groupChatModel'); 

// Add a message to a group chat


// get all messages from a group chat
router.get('/group/chatName/getMessages', async (req, res) =>{

    // see if the GC exists and if not return a 404 error to the user. 
    const groupChat = await groupChat.findOne( { chatName: req.params.chatName } );
    if(!groupChat){ 
        return res.status(404).json({ message: 'No such group in DB' });
    } 


    const msg = await groupMessage.find(
        { chatName: req.params.chatName }
    ).populate('sender')

    res.json(msg);
}); 


module.exports = router; 