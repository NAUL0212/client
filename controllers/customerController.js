// p1: import
const User = require('../models/user'); // Import model User
const asyncHandler = require("express-async-handler");

class CustomerController {
    // API GET ALL CUSTOMERS (Render trang Handlebars)
    getCustomers = asyncHandler(async (req, res) => {
        const customers = await User.find().lean(); // Lấy tất cả Users từ MongoDB
        res.render('customer', { customers }); // Render ra trang Handlebars
    });
}

// p3: export
module.exports = new CustomerController();
