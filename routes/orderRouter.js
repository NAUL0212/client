// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const orderController = require('../controllers/OrderController');

// p3: khởi tạo validate
const validateToken = require('../middlewares/validateTokenHandler')


// p4: root path
router.get('/',validateToken, orderController.GetAllOrder);       //Điều hướng đến giao diện danh sách đơn hàng
router.post('/', orderController.CreateOrder);      // Xử lý tạo đơn hàng
router.get('/:id',validateToken, orderController.GetOrderById);   //Điều hướng đến chi tiết đơn hàng

// p5: export
module.exports = router;


