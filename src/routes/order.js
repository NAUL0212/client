// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const orderController = require('../app/controllers/OrderController');

// p3: Object.index
router.get('/', orderController.GetAllOrder);
router.post('/', orderController.CreateOrder);
router.get('/:id', orderController.GetOrderById);

// p4: export
module.exports = router;
