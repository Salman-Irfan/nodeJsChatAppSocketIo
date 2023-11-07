const express = require('express');
const getAllUsersController = require('../../controllers/userControllers/getAllUsersController');
const router = express.Router();

// get all users route
router.post('/get-all-users', getAllUsersController );


module.exports = router;