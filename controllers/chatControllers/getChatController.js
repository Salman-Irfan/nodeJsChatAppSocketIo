const express = require('express');
const User = require('../../models/userModel');
const Chat = require('../../models/chatModel');
const getChatController = async (req, res) => {
    try {
        let loggedInuserEmail = req.user.email
        let loggedInuser = await User.findOne({ email: loggedInuserEmail })
        let loggedInUserId = loggedInuser._id
        // if user not logged in
        if (!loggedInUserId) {
            return res.json({ message: 'logged in user not found' })
        }
        let loggedInUserChat = await Chat.find({
            users: {
                $elemMatch: { $eq: loggedInUserId }
            }
        }).populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})

        loggedInUserChat = await User.populate(loggedInUserChat, {
            path: 'latestMessage.sender',
            select: "name pic email"
        })
        res.send(loggedInUserChat)
    } catch (error) {
        return res.json({ error: error.message })
    }
}
module.exports = getChatController