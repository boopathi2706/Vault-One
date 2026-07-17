const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const {getAdminDashboardData,getMonthWiseProfit,getDayWiseProfit} =require("../controllers/admin_controller");
const calculatePrince=require("../services/calculateprice");


router.get("/get_dashboard_data",verifyToken,getAdminDashboardData);
router.get("/get_month_wise_profit",verifyToken,getMonthWiseProfit);
router.get("/get_day_wise_profit",verifyToken,getDayWiseProfit);
router.get("/calculate_price",verifyToken,calculatePrince);

module.exports = router;