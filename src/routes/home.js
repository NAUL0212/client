const express = require("express");
const router = express.Router();
const dashboardController = require("../app/controllers/dashboardController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, dashboardController.DashBoard);

module.exports = router;
