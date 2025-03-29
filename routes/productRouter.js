// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const productController = require('../controllers/ProductController');


// p3: khởi tạo validate
const validateToken = require('../middlewares/validateTokenHandler')


// p4: root path

router.get('/create', validateToken, productController.GetCreateProduct);      // hiển thị form thêm sản phẩm
router.post('/create', validateToken, productController.CreateProduct);        // thêm sản phẩm

router.get('/', validateToken, productController.GetAllProduct);               // lấy danh sách sản phẩm


router.get('/edit/:id', validateToken, productController.GetEditProduct);      // Hiển thị form sửa sản phẩm
router.post('/update/:id', validateToken, productController.UpdateProduct);    // xử lí cập nhật sản phẩm

router.get('/delete/:id', validateToken, productController.DeleteProduct);     // xóa sản phẩm


// p5: export
module.exports = router;



