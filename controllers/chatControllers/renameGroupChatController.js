const express = require('express');
const Chat = require('../../models/chatModel');
const renameGroupChatController = async (req, res) => {
    
    const { chatId, chatName } = req.body

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName: chatName
            },
            {
                new: true,
            })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        if (!updatedChat) {
            return res.json({
                message: "chat not found",
            })
        } else {
            return res.json({
                message: "chat updated successfully",
                data: updatedChat
            })
        }
    } catch (error) {
        return res.json({ error: error})
    }

    
}
module.exports = renameGroupChatController