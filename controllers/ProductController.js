// B1: khai báo
const Products = require('../models/product');
const asyncHandler = require('express-async-handler');

class ProductController {
    
    // API GET ALL PRODUCTS
    GetAllProduct = asyncHandler(async (req, res) => {
        const products = await Products.find().lean(); // Truy vấn MongoDB
        res.render('products', { products }); // Render view products.handlebars
    });

    
    // API hiển thị form thêm sản phẩm
    GetCreateProduct = asyncHandler(async (req, res) => {
        console.log(req.params); // Kiểm tra request params
        res.render('product-create');
    });

    // API xử lí thêm sản phẩm
    CreateProduct = asyncHandler(async (req, res) => {
        // Kiểm tra nếu req.body.size là chuỗi và chuyển đổi thành mảng
        if (typeof req.body.size === 'string') {
            req.body.size = req.body.size.split(',');
        }
        const product = new Products(req.body);
        await product.save();
        res.redirect('/products');
    });

    // API hiển thị form sửa sản phẩm
    GetEditProduct = asyncHandler(async (req, res) => {
        const product = await Products.findById(req.params.id).lean();
        if (!product) {
            return res.status(404).send("Sản phẩm không tồn tại");
        }
        res.render('product-edit', { product });
    });

    // API Xử lý cập nhật sản phẩm
    UpdateProduct = asyncHandler(async (req, res) => {
        // Kiểm tra nếu req.body.size là chuỗi và chuyển đổi thành mảng
        if (typeof req.body.size === 'string') {
            req.body.size = req.body.size.split(',');
        }
        await Products.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    });

    // API DELETE PRODUCT
    DeleteProduct = asyncHandler(async (req, res) => {
        await Products.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    });
}

// B3: export
module.exports = new ProductController();
