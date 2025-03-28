const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    name: String,
    image: { type: String, default: 'default.jpg' },
    price: Number,
    category: String,
    size: [String],
    description: String,
    stock: Number,
}, { timestamps: true });  // Thêm timestamps để có createdAt và updatedAt tự động);

module.exports = mongoose.model('Products', Products);



