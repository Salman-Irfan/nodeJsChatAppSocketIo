const express = require('express');
const requireSignIn = require('../../middlewares/authMiddleware');
const accessChatController = require('../../controllers/chatControllers/accessChatController');
const getChatController = require('../../controllers/chatControllers/getChatController');
const createGroupChatController = require('../../controllers/chatControllers/createGroupChatController');
const renameGroupChatController = require('../../controllers/chatControllers/renameGroupChatController');
const removeFromGroupController = require('../../controllers/chatControllers/removeFromGroupController');
const addToGroupController = require('../../controllers/chatControllers/addToGroupController');
const router = express.Router();

// create a chat route
router.post('/access-chat', requireSignIn, accessChatController);
// get all chat of a user route
router.get('/get-chat', requireSignIn, getChatController);
// create group chat route
router.post('/create-group', requireSignIn, createGroupChatController);
// rename group chat route
router.put('/rename-group', requireSignIn, renameGroupChatController);
// remove from group  route
router.put('/rmove-from-group', requireSignIn, removeFromGroupController);
// add to group  route
router.put('/add-to-group', requireSignIn, addToGroupController);




module.exports = router;