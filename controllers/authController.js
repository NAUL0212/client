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


// ĐĂNG KÝ NGƯỜI DÙNG MỚI
exports.registerUser = asyncHandler(async (req, res) =>{
    const {username, password} = req.body;

    // KIỂM TRA DỮ LIỆU ĐẦU VÀO
    if(!username || !password){
        res.status(400);
        throw new Error("Vui lòng nhập đầy đủ thông tin đăng ký");
    }

    // KIỂM TRA TRÙNG TÊN ĐĂNG KÝ
    const userExists = await User.findOne({username});
    if(userExists){
        res.status(400);
        throw new Error("Tên đăng ký đã được sử dụng!");
    }

    // MÃ HÓA MẬT KHẨU
    const hashedPassword = await bcrypt.hash(password, 10);

    // TẠO NGƯỜI DÙNG MỚI
    const user = await User.create({
        username,
        password: hashedPassword
    });

    if(user){
        res.status(201).json({
            msg: "Tạo tài khoản thành công!",
            _id: user.id,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error("Thông tin người dùng không hợp lệ")
    }
});

// ĐĂNG NHẬP NGƯỜI DÙNG
exports.login = asyncHandler(async (req, res) =>{
    const {username, password} = req.body;

    // KIỂM TRA DỮ LIỆU ĐẦU VÀO
    if(!username || !password){
        res.status(400);
        throw new Error("vui lòng nhập đầy đủ dữ liệu");
    }

    // TÌM USER TRONG MONGODB
    const user = await User.findOne({username});

    // KIỂM TRA MẬT KHẨU
    if (user && (await bcrypt.compare(password, user.password))) {
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

        res.redirect("/dashboard");
    } else {
        res.status(401);
        throw new Error("Email hoặc mật khẩu không đúng!");
    }
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