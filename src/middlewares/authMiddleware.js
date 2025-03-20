const jwt = require("jsonwebtoken");

// Middleware kiểm tra token trong cookie
const authenticateToken = (req, res, next) => {
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

    // Kiểm tra token hợp lệ hay không
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return req.accepts("html")
                    ? res.redirect("/auth/login") // Hết hạn thì chuyển hướng login
                    : res.status(401).json({ message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!" });
            }
            return req.accepts("html")
                ? res.redirect("/auth/login")
                : res.status(403).json({ message: "Token không hợp lệ!" });
        }
        req.user = user; // Lưu thông tin user vào request

        // Kiểm tra quyền admin nếu là route thêm/sửa/xóa sản phẩm
        if (["POST", "PUT", "DELETE"].includes(req.method) && user.role !== "admin") {
            return req.accepts("html")
                ? res.redirect("/auth/login")
                : res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }

        next(); // Tiếp tục nếu hợp lệ
    });
};

module.exports = authenticateToken;
