const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
    res.render("login");
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Giả lập user admin
    const user = { id: 1, username: "admin" };

    if (username !== "admin" || password !== "123456") {
        return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng!" });
    }

    // Tạo JWT token
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Lưu token vào cookie
    res.cookie("token", token, {
        httpOnly: true, // Bảo mật, ngăn chặn JavaScript truy cập
        secure: process.env.NODE_ENV === "production", // Chỉ dùng HTTPS ở môi trường production
        maxAge: 3600000 // 1 giờ
    });

    // Điều hướng đến dashboard sau khi đăng nhập thành công
    res.redirect("/dashboard");
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login"); // Sau khi đăng xuất, quay lại trang đăng nhập
};

exports.checkAuthStatus = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ loggedIn: true, username: user.username });
    } catch (error) {
        res.json({ loggedIn: false });
    }
};
