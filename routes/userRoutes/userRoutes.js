const express = require('express');
const getAllUsersController = require('../../controllers/userControllers/getAllUsersController');
const requireSignIn = require('../../middlewares/authMiddleware');
const router = express.Router();

// get all users route
router.get('/get-all-users', requireSignIn, getAllUsersController );


module.exports = router;