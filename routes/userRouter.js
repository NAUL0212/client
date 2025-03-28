// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const userController = require('../controllers/userController');

// p3: khởi tạo validate
const validateToken = require('../middlewares/validateTokenHandler')

// p4: root path
router.post('/', userController.login);
router.post('/', userController.register);

// p5: export
module.exports = router;
