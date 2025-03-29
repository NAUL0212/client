// p1: import
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user'); // Import model User

// p2:
// HIỂN THỊ TRANG ĐĂNG NHẬP
exports.loginPage = (req, res) =>{
    res.render("login");
};


// ĐĂNG NHẬP ADMIN
exports.login = asyncHandler(async (req, res) =>{
    const {username, password} = req.body;

    // SET ACCOUNT ADMIN
    const user = {id: 1, username: "admin", password: "12341234"};

    // KIỂM TRA DỮ LIỆU ĐẦU VÀO
    if (username !== "admin" || password !== "12341234") {
        return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng!" });
    }


    // Tạo JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Lưu token vào cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 // 1 giờ
        });
        
        res.redirect("/dashboard");     // điều hướng đến dashobard
    
});

// Đăng xuất người dùng
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};

// Kiểm tra trạng thái xác thực
exports.checkAuthStatus = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ loggedIn: true, username: decoded.username });
    } catch (error) {
        res.json({ loggedIn: false });
    }
};