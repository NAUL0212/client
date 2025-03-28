// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const apiController = require('../controllers/APIController');

// p3: khởi tạo validate
const validateToken = require('../middlewares/validateTokenHandler')


// p4: root path
router.get('/products', apiController.GetJSONProduct);          // router get products
router.get('/products/:id', apiController.GetJSONProductById);  // router get producst by ID

// p5: export
module.exports = router;
