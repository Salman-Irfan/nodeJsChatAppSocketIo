const express = require('express')
const { validationResult } = require("express-validator");
const User = require('../../models/userModel');

const accessChatController = async (req, res) => {
    const errors = validationResult(req);
    // if errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let userEmail = req.user.email
        let user = await User.findOne({ email: userEmail })
        let userId = user._id
        console.log(userId);
    } catch (error) {
        return res.json({ errors: error.message })
    }
}
module.exports = accessChatController