// B1: khai báo
const Products = require('../models/product');
const mongoose = require('mongoose');

// B2: hàm
class ProductController{

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

    // API GET PRODUCT BY ID (trả về JSON)
    async GetJSONProductById(req, res) {
        try {
            const { id } = req.params;

            // Kiểm tra nếu id là ObjectId hợp lệ
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            const product = await Products.findById(id).lean();

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

}

// B3: export
module.exports = new ProductController();