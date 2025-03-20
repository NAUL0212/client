// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const dashboardController = require('../app/controllers/dashboardController');

// p3: Object.index
router.get('/', dashboardController.DashBoard);

// p4: export
module.exports = router;
