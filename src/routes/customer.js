// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const customerController = require('../app/controllers/customerController');
const authenticateToken = require("../middlewares/authMiddleware");

// p3: Object.index
router.get('/', authenticateToken, customerController.getCustomers);       //Điều hướng đến giao diện danh sách khách hàng


// p4: export
module.exports = router;
