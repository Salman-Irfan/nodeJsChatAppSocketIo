const express = require('express')
const Chat = require("../../models/chatModel")


const addToGroupController = async (req, res) => {
    const { chatId, userId } = req.body

    try {
        const added = await Chat.findByIdAndUpdate(
            chatId, {
            $push: { users: userId },

        }, {
            new: true
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!added) {
            return res.json({
                message: "user not added"
            })
        } else {
            return res.json({
                message: "user added successfully",
                data: added
            })
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }

    
}
module.exports = addToGroupController