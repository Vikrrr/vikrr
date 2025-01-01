const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
// Comment out auth for now
// const auth = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, JPEG and PNG are allowed.'));
        }
    }
});

// POST route for creating new product
router.post('/products', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 2 }
]), async (req, res) => {
    try {
        const productData = {
            ...req.body,
            negotiable: req.body.negotiable === 'true', // Convert string to boolean
            // ... other fields ...
        };
        
        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;