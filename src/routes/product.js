// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const productController = require('../app/controllers/ProductController');

// p3: Object.index

router.get('/create', productController.GetCreateProduct);      // hiển thị form thêm sản phẩm
router.post('/create', productController.CreateProduct);        // thêm sản phẩm

router.get('/', productController.GetAllProduct);               // lấy danh sách sản phẩm
router.get('/:id', productController.GetProductById);           // lấy sản phẩm theo id


router.get('/edit/:id', productController.GetEditProduct);      // Hiển thị form sửa sản phẩm
router.post('/update/:id', productController.UpdateProduct);    // xử lí cập nhật sản phẩm
router.get('/delete/:id', productController.DeleteProduct);     // xóa sản phẩm


// p4: export
module.exports = router;
