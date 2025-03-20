// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const userController = require('../app/controllers/userController');

// p3: Object.index
router.post('/', userController.register);

// p4: export
module.exports = router;
