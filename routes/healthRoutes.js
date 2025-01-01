const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/health', async (req, res) => {
    try {
        // Check MongoDB connection
        const dbState = mongoose.connection.readyState;
        const dbStatus = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        res.json({
            status: 'ok',
            timestamp: new Date(),
            mongodb: {
                status: dbStatus[dbState],
                connected: dbState === 1
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});

module.exports = router; 