const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    // Kiểm tra user đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu user vào DB
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server, thử lại sau" });
  }
};


exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      console.log("📩 Received login request:", { username, password });
  
      // Kiểm tra user có tồn tại không
      const user = await User.findOne({ username });
      if (!user) {
        console.log("🚨 User not found!");
        return res.status(400).json({ message: "Tài khoản không tồn tại!" });
      }
  
      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("🔑 Incorrect password!");
        return res.status(400).json({ message: "Mật khẩu không đúng!" });
      }
  
      // Tạo token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      console.log("✅ Login successful!");
  
      res.json({
        message: "Đăng nhập thành công!",
        token,
        user: { id: user._id, username: user.username },
      });
    } catch (error) {
      console.error("🔥 Server error:", error);
      res.status(500).json({ message: "Lỗi server!" });
    }
  };
  