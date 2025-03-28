// B1: khai báo
const Order = require('../models/order');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

class OrderController {

    // API GET LIST ORDERS
    GetAllOrder = asyncHandler(async (req, res) => {
        const orders = await Order.find().lean(); // lấy tất cả đơn hàng từ MongoDB
        res.render('orders', { orders }); // Render file orders.handlebars
    });

    // API GET ORDER BY ID
    GetOrderById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        console.log(id); // Kiểm tra xem id có đúng không

        // Kiểm tra nếu id là ObjectId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ' });
        }

        const order = await Order.findById(id).lean();

        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        res.render('orders-detail', { order }); // hiển thị chi tiết đơn hàng với ID đơn hàng
    });

    // API POST ORDERS
    CreateOrder = asyncHandler(async (req, res) => {
        const { customerInfo, cartItems, totalAmount } = req.body;

        const newOrder = new Order({
            customerInfo,
            cartItems,
            totalAmount,
            status: 'Đang xử lý'
        });

        const savedOrder = await newOrder.save();
        res.json({
            success: true,
            message: 'Đặt hàng thành công!',
            orderDetails: savedOrder
        });
    });

}

// B3: export
module.exports = new OrderController();
