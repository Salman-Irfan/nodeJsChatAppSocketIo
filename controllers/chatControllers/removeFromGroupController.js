const express = require('express');
const Chat = require("../../models/chatModel")


const removeFromGroupController = async (req, res) => {
    const { chatId, userId } = req.body

    try {
        const removed = await Chat.findByIdAndUpdate(
            chatId, {
            $pull: { users: userId },

        }, {
            new: true
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!removed) {
            return res.json({
                message: "user not removed"
            })
        } else {
            return res.json({
                message: "user removed successfully",
                data: removed
            })
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}
module.exports = removeFromGroupController