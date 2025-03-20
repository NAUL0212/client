// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const orderController = require('../app/controllers/OrderController');
const authenticateToken = require("../middlewares/authMiddleware");

// p3: Object.index
router.get('/', authenticateToken, orderController.GetAllOrder);       //Điều hướng đến giao diện danh sách đơn hàng
router.post('/', orderController.CreateOrder);      // Xử lý tạo đơn hàng
router.get('/:id', authenticateToken, orderController.GetOrderById);   //Điều hướng đến chi tiết đơn hàng

// p4: export
module.exports = router;
