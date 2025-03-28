// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const customerController = require('../controllers/customerController');

// p3: khởi tạo validate
const validateToken = require('../middlewares/validateTokenHandler')


// p4: root path
router.get('/', validateToken, customerController.getCustomers);       //Điều hướng đến giao diện danh sách khách hàng


// p5: export
module.exports = router;
