const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customerInfo: [
        {
            name: { type: String },
            email: { type: String },
            address: {type: String},
            phone: {type: Number},  // Chỉnh sửa kiểu dữ liệu phone thành Number
            paymentMethod: {type: String}
        }
    ],
    cartItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },  // Thêm productId
            name: { type: String },
            image: { type: String },
            price: { type: Number },
            selectedSize: { type: String },
            quantity: { type: Number }
        }
    ],
    totalAmount: {type: Number},  // Đảm bảo type là Number
    status: {type: String},     // Đảm bảo type là Boolean
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Order', Order);



