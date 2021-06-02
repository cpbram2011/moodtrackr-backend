const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    
}, {timestamps: true
});

ProductSchema.index({name: 1, user_id: 1}, {unique: true})

module.exports = Track = mongoose.model('Product', ProductSchema)