const express = require('express')
const requireSignIn = require('../../middlewares/authMiddleware')
const sendMessageController = require('../../controllers/messageControllers/sendMessageController')
const getAllMessagesById = require('../../controllers/messageControllers/getAllMessagesById')
const router = express.Router()

// send message route
router.post('/message', requireSignIn, sendMessageController)
// get all messages
router.get('/messages/:chatId', requireSignIn, getAllMessagesById ) 

module.exports = router