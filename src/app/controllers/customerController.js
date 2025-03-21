const User = require('../models/user'); // Import model User

const customerController = {
    async getCustomers(req, res) {
        try {
            const customers = await User.find().lean(); // Lấy tất cả Users từ MongoDB
            res.render('customer', { customers }); // Render ra trang Handlebars
        } catch (error) {
            console.error("Error fetching customers:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = customerController;
