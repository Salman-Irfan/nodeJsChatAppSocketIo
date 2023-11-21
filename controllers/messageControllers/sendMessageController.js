const express = require('express');
const User = require('../../models/userModel')
const Message = require ('../../models/messageModel')
const Chat = require('../../models/chatModel')
const sendMessageController = async (req, res) => {
    const { content, chatId } = req.body
    // validation errors
    if(!content || !chatId) {
        return res.json({
            message: 'invalid data passed to message'
        })
    }
    // get logged in user id
    let loggedInuserEmail = req.user.email
    let loggedInuser = await User.findOne({ email: loggedInuserEmail })
    let loggedInUserId = loggedInuser._id
    // if user not logged in
    if (!loggedInUserId) {
        return res.json({ message: 'logged in user not found' })
    }
    // creating new message object
    let newMessage = {
        sender: loggedInUserId,
        content: content,
        chat: chatId
    }
    // saving in the database
    try {
        let message = await Message.create(newMessage)
        message = await message.populate('sender', 'name pic')
        message = await message.populate('chat')
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })
        res.json(message)
    } catch (error) {
        console.log(error)
        return res.json({
            error: error.message
        })
    }
}

module.exports = sendMessageController