// B1: khai báo
const Order = require('../models/order');
const mongoose = require('mongoose');

// B2: hàm
class OrderController{

    // API GET LIST ORDERS
    async GetAllOrder(req, res){
        try{
                const orders = await Order.find(); // lấy tất cả đơn hàng từ MongoDB
                res.json({
                    success: true,
                    orders: orders
                });
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: 'Error retrieving orders',
                    error: err
                });
            }
    }

    // API GET ORDER BY ID
        async GetOrderById(req, res){
            try {
                    const {id} = req.params;
            
                    // Kiểm tra nếu id là ObjectId hợp lệ
                    if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(400).json({ message: 'Invalid order ID' });
                    }
            
                    const order = await Order.findById(id);
            
                    if (!order) {
                        return res.status(404).json({ message: 'Product not found' });
                    }
            
                    res.json(order);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Server error' });
                }
        }

    // API POST ORDERS
    CreateOrder(req, res){
        const { customerInfo, cartItems, totalAmount } = req.body;
        
            const newOrder = new Order({
                customerInfo,
                cartItems,
                totalAmount,
                status: 'Đang xử lý'
            });
        
            newOrder.save()
                .then(order => {
                    res.json({
                        success: true,
                        message: 'Đặt hàng thành công!',
                        orderDetails: order
                    });
                })
                .catch(err => {
                    console.error("Lỗi truy vấn MongoDB:", err);
                    res.status(500).json({ error: err.message });
                });
    }

}


// B3: export
module.exports = new OrderController();