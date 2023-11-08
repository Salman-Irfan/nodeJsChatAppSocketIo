const express = require('express')
const router = express.Router()
// Import routes modules here
const authRoutes = require("./authRoutes/authRoutes")
const userRoutes = require("./userRoutes/userRoutes")
const chatRoutes = require("./chatRoutes/chatRoutes")


// Define base routes for your modules
router.use('/api/v1/', authRoutes);
router.use('/api/v1/', userRoutes);
router.use('/api/v1/', chatRoutes);

module.exports = router;