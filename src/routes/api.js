// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const apiController = require('../app/controllers/APIController');

// p3: Object.index

router.get('/products', apiController.GetJSONProduct);          // router get products
router.get('/products/:id', apiController.GetJSONProductById);  // router get producst by ID

// p4: export
module.exports = router;
