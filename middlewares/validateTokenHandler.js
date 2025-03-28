const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Middleware kiểm tra token trong cookie
const authenticateToken = asyncHandler(async (req, res, next) => {
    // Kiểm tra xem cookie có tồn tại không
    if (!req.cookies || !req.cookies.token) {
        // Nếu yêu cầu từ trình duyệt (HTML), chuyển hướng đến trang đăng nhập
        if (req.accepts("html")) {
            return res.redirect("/auth/login");
        }
        // Nếu là API request, trả về JSON thông báo lỗi
        return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
    }

    const token = req.cookies.token; // Lấy token từ cookie

    try {
        // Kiểm tra token hợp lệ hay không
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Lưu thông tin user vào request
        next(); // Tiếp tục nếu hợp lệ
        
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            if (req.accepts("html")) {
                return res.redirect("/auth/login"); // Hết hạn thì chuyển hướng login
            }
            return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!" });
        }
        if (req.accepts("html")) {
            return res.redirect("/auth/login");
        }
        return res.status(403).json({ message: "Token không hợp lệ!" });
    }
});

module.exports = authenticateToken;
