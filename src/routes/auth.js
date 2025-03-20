const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/authController");


router.post("/login", authController.login);    //xử lí đăng nhập
router.get("/login", authController.loginPage);  // điều hướng đến trang login
router.post("/logout", authController.logout);  // xử lí đăng xuất
router.get("/status", authController.checkAuthStatus);


module.exports = router;
