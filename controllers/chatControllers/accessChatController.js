const express = require('express')
const { validationResult } = require("express-validator");
const User = require('../../models/userModel');
const Chat = require('../../models/chatModel');

const accessChatController = async (req, res) => {
    const errors = validationResult(req);
    // if errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // this controller is responsible for creating and fetching one on one chat
    try {
        let loggedInuserEmail = req.user.email
        let loggedInuser = await User.findOne({ email: loggedInuserEmail })
        let loggedInUserId = loggedInuser._id
        // if user not logged in
        if (!loggedInUserId) {
            return res.json({ message: 'logged in user not found' })
        }
        const { receiverUserId } = req.body
        // else => if user logged in, check if the chat exists with this user
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [{
                users: {
                    $elemMatch: { $eq: loggedInUserId }
                },
                users: {
                    $elemMatch: { $eq: receiverUserId }
                },
            }]
        }).populate("users", "-password")
            .populate("latestMessage")

        // populate further to sender field inside message model
        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: "name pic email"
        })
        // if chat exists
        if (isChat.length > 0) {
            res.send(isChat[0])
        } else { // create a new chat
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [loggedInUserId, receiverUserId]
            }
            const createdChat = await Chat.create(chatData)
            // save chat in db
            const fullChat = await Chat.findOne({
                _id: createdChat._id
            }).populate("users", "-password")
    
            // return res.json({ loggedInUserId: loggedInUserId });
            return res.json({ fullChat: fullChat });
        }
    } catch (error) {
        return res.json({ errors: error.message })
    }
}
module.exports = accessChatController