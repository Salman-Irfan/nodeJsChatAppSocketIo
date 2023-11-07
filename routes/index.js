const express = require('express')
const router = express.Router()

// // Import routes modules here
const authRoutes = require("./authRoutes/authRoutes")
const userRoutes = require("./userRoutes/userRoutes")
// // Define base routes for your modules
router.use('/api/v1/', authRoutes);
router.use('/api/v1/', userRoutes);

module.exports = router;