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
    try {
        const users = await User.find(keyword);

        // Update the pic value with the base URL
        const usersWithUpdatedPic = users.map(user => ({
            ...user.toObject(),
            pic: `${req.protocol}://${req.get('host')}/images/${user.pic}`
        }));

        res.send(usersWithUpdatedPic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = getAllUsersController 