// p1: import
const express = require('express');
const router = express.Router();

// p2: khởi tạo controller
const productController = require('../app/controllers/ProductController');
const authenticateToken = require("../middlewares/authMiddleware");

// p3: Object.index

router.get('/create', authenticateToken, productController.GetCreateProduct);      // hiển thị form thêm sản phẩm
router.post('/create', authenticateToken, productController.CreateProduct);        // thêm sản phẩm

router.get('/', authenticateToken, productController.GetAllProduct);               // lấy danh sách sản phẩm
router.get('/:id', authenticateToken, productController.GetProductById);           // lấy sản phẩm theo id


router.get('/edit/:id', authenticateToken, productController.GetEditProduct);      // Hiển thị form sửa sản phẩm
router.post('/update/:id',authenticateToken, productController.UpdateProduct);    // xử lí cập nhật sản phẩm

router.get('/delete/:id',authenticateToken, productController.DeleteProduct);     // xóa sản phẩm


// p4: export
module.exports = router;
