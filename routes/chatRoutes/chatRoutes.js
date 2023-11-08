const express = require('express');
const requireSignIn = require('../../middlewares/authMiddleware');
const createChatController = require('../../controllers/chatControllers/createChatController');
const getChatController = require('../../controllers/chatControllers/getChatController');
const createGroupChatController = require('../../controllers/chatControllers/createGroupChatController');
const router = express.Router();

// create a chat route
router.post('/create-chat', requireSignIn, createChatController);
// get all chat of a user route
router.get('/get-chat', requireSignIn, getChatController);
// create group chat route
router.post('/create-group', requireSignIn, createGroupChatController);



module.exports = router;