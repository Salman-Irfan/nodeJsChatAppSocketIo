const express = require('express');
const { validationResult } = require("express-validator");
const User = require('../../models/userModel');
const Chat = require('../../models/chatModel');


const createGroupChatController = async (req, res) => {
    const errors = validationResult(req);
    // if errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // get logged in user
    let loggedInuserEmail = req.user.email
    let loggedInuser = await User.findOne({ email: loggedInuserEmail })
    let loggedInUserId = loggedInuser._id
    // if user not logged in
    if (!loggedInUserId) {
        return res.json({ message: 'logged in user not found' })
    }

    // if body has no group name, or users
    if (!req.body.users || !req.body.name) {
        return res.json({ message: 'please fill group name and users properly' })
    }
    // parse the users
    let users = JSON.parse(req.body.users)
    // if users length is less than 2, show error message
    if (users.length < 2) {
        return res.json({ message: 'More than 2 users are required to form a group chat' })
    }
    // push the loggedInUser into the group chat
    users.push(loggedInUserId)

    // save to db
    try { 
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: loggedInUserId,
        });
        const fullChat = await Chat.findOne({
            _id: groupChat._id
        }).populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.json(fullChat);
    } catch (error) {
        return res.json({ error: error.message })
    }

}
module.exports = createGroupChatController