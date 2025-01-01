const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vikrr_marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    negotiable: Boolean,
    description: { type: String, required: true },
    contactNumber: { type: String, required: true },
    location: { type: String, required: true },
    mainImage: { type: String, required: true },
    additionalImages: [String],
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// API Routes
app.post('/api/products', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 2 }
]), async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            mainImage: req.files.mainImage[0].path,
            additionalImages: req.files.additionalImages 
                ? req.files.additionalImages.map(file => file.path)
                : []
        });

        await product.save();
        res.status(201).json({ success: true, productId: product._id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 