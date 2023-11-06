const express = require('express')
const router = express.Router()

// // Import routes modules here
const authRoutes = require("./authRoutes/authRoutes")

// // Define base routes for your modules
router.use('/api/v1/', authRoutes);

module.exports = router;