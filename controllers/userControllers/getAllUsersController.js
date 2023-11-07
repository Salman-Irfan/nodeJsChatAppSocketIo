const express = require('express');
const User = require('../../models/userModel');
// http://localhost:5000/api/v1/get-all-users/?search=salman&age=24
const getAllUsersController = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {
                name: {
                    $regex: req.query.search,
                    $options: "i"
                },
                email: {
                    $regex: req.query.search,
                    $options: "i"
                },
            }
        ]
    } : {}
    // query the database
    const users = await User.find(keyword)
    res.send(users)
}
module.exports = getAllUsersController 