const express = require("express")
const User = require("../../models/userModel")
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

const userLoginController = async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // object destructuring
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }

        const passwordCompare = await bcrypt.compareSync(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }

        // Extracting password and rest of the user data
        const { password: hashedPassword, ...userWithoutPassword } = user.toObject();
        // Update the pic value with protocol and host
        userWithoutPassword.pic = `${req.protocol}://${req.get('host')}/images/${userWithoutPassword.pic}`;

        const authtoken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        success = true;

        res.json({ success, authtoken, user: userWithoutPassword });
    } catch (error) {
        console.log(error)
    }
}

module.exports = userLoginController