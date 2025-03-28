// p1: import
const express = require("express");
const router = express.Router();

// p2: khởi tạo controller
const authController = require("../controllers/authController");

// p3: khởi tạo validate
const validateToken = require('../middlewares/validateTokenHandler')


// p4: root path
router.get("/login", authController.loginPage);         // điều hướng đến trang login
router.post("/login", authController.login);            //xử lí đăng nhập

router.post("/logout", authController.logout);          // xử lí đăng xuất
router.get("/status", authController.checkAuthStatus);

// p5: exports
module.exports = router;
