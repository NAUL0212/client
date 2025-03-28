// B1: import
const Products = require('../models/product');
const asyncHandler = require("express-async-handler");

// B2: hàm
class ProductController {

    // API GET ALL PRODUCTS (trả về JSON)
    GetJSONProduct = asyncHandler(async (req, res) => {
        const products = await Products.find().lean();
        res.json(products);
    });

    // API GET PRODUCT BY ID (trả về JSON)
    GetJSONProductById = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Products.findById(id).lean();

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    });

}

// B3: export
module.exports = new ProductController();
