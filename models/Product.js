const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'books', 'furniture', 'clothing', 'sports', 'other']
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'like-new', 'good', 'fair', 'poor']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    negotiable: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        url: String,
        isMainImage: Boolean
    }],
    contactDetails: {
        phoneNumber: String,
        location: String
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'deleted'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);