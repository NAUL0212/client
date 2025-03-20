// B1: khai báo
const Order = require('../models/order');
const mongoose = require('mongoose');

// B2: hàm
class OrderController{

    // API GET LIST ORDERS
    async GetAllOrder(req, res){
        try{
                const orders = await Order.find().lean(); // lấy tất cả đơn hàng từ MongoDB
                res.render('orders', { orders }); // Render file orders.handlebars
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: 'Lỗi khi lấy danh sách đơn hàng',
                    error: err
                });
            }
    }

    // API GET ORDER BY ID
        async GetOrderById(req, res){
            try {
                    const {id} = req.params;
                    console.log(id); // Kiểm tra xem id có đúng không
            
                    // Kiểm tra nếu id là ObjectId hợp lệ
                    if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(400).json({ message: 'ID đơn hàng không hợp lệ' });
                    }
            
                    const order = await Order.findById(id).lean();
            
                    if (!order) {
                        return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
                    }
            
                    res.render('orders-detail', { order });         // hiển thị chi tiết đơn hàng với ID đơn hàng
                    // res.status(200).json({ 
                    //     success: true,
                    //     order 
                    // });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Lỗi server' });
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