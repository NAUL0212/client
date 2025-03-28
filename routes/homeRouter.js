const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

const validateToken = require('../middlewares/validateTokenHandler')


router.get("/", validateToken, dashboardController.DashBoard);

module.exports = router;
