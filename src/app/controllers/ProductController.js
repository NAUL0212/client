// B1: khai báo
const Products = require('../models/product');
const mongoose = require('mongoose');

// B2: hàm
class ProductController{

    // API GET ALL PRODUCTS
    async GetAllProduct(req, res){
        try {
            const products = await Products.find().lean(); // Truy vấn MongoDB
            res.render('products', { products });     // Render view products.handlebars
        } catch (err) {
            // Render view với thông báo lỗi
            console.log(err);
            res.render('products', { error: err.message });
        }
    }

    // API GET ALL PRODUCTS (trả về JSON)
    async GetJSONProduct(req, res) {
        try {
            const products = await Products.find().lean(); // Truy vấn MongoDB và lấy dữ liệu dạng plain object
            res.json(products); // Trả về dữ liệu JSON
        } catch (err) {
            // Trả về lỗi JSON nếu có lỗi xảy ra
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    // API GET PRODUCTS BY ID
    async GetProductById(req, res){
        try {
                const {id} = req.params;
        
                // Kiểm tra nếu id là ObjectId hợp lệ
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({ message: 'Invalid product ID' });
                }
        
                const product = await Products.findById(id);
        
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
        
                res.json(product);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
    }

    // API hiển thị form thêm sản phẩm
    async GetCreateProduct(req, res){
        try {
            console.log(req.params); // Kiểm tra request params
            res.render('product-create');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi khi hiển thị form thêm sản phẩm" });
        }
    }

    // API xử lí thêm sản phẩm
    async CreateProduct(req, res){
        try {
            // Kiểm tra nếu req.body.size là chuỗi và chuyển đổi thành mảng
            if (typeof req.body.size === 'string') {
                req.body.size = req.body.size.split(',');
            }
            const product = new Products(req.body);
            await product.save();
            res.redirect('/products');
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // API hiển thị form sửa sản phẩm
    async GetEditProduct(req, res) {
        try {
            const product = await Products.findById(req.params.id).lean(); // Thêm .lean() để lấy dữ liệu dạng plain object
            if (!product) {
                return res.status(404).send("Sản phẩm không tồn tại");
            }
            res.render('product-edit', { product }); // Truyền product cho view
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // API Xử lý cập nhật sản phẩm
    async UpdateProduct(req, res) {
        try {
            // Kiểm tra nếu req.body.size là chuỗi và chuyển đổi thành mảng
            if (typeof req.body.size === 'string') {
                req.body.size = req.body.size.split(',');
            }
            await Products.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/products'); // Chuyển hướng về trang danh sách sản phẩm
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // API DELETE PRODUCT
    async DeleteProduct(req, res) {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.redirect('/products'); // Chuyển hướng về trang danh sách sản phẩm
        } catch (err) {
            res.status(500).send(err);
        }
    }



}

// B3: export
module.exports = new ProductController();