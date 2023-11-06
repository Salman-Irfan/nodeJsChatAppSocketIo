const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userRegisterController = require('../../controllers/authControllers/userRegisterController');
const userLoginController = require('../../controllers/authControllers/userLoginController');

// create note route
router.post("/register",
    [
        body("name", "Enter a valid name in between 3 to 30 characters").isLength({ min: 3, max: 30 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password length min 5").isLength({ min: 5 }),
    ],
    userRegisterController
);

// login route
router.post('/login',
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password can't be blank").isLength({ min: 1 }),
    ],
    userLoginController
);


module.exports = router;