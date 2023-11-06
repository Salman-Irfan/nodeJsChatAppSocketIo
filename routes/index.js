const express = require('express')
const router = express.Router()

// // Import routes modules here
const authRoutes = require("./authRoutes/authRoutes")
// const carsRoutes = require("./carRoutes/carRoutes")

// // Define base routes for your modules
router.use('/api/v1/', authRoutes);
// router.use('/api/v1/', carsRoutes);

module.exports = router;