const express = require('express');
const Message = require('../../models/messageModel')

const getAllMessagesById = async (req, res) => {
    try {
        const messages = await Message.find({
            chat: req.params.chatId
        })
            .populate('sender', 'name pic email')
            .populate('chat')
        // send response
        res.json(messages)
    } catch (error) {
        return res.json({
            error: error.message
        })
        console.log(error);
    }
}


module.exports = getAllMessagesById