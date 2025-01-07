const express = require("express");
const router = express.Router();

// Import sub-routes for different dashboard sections
const summaryRoutes = require("./dashboardRoutes/summaryRoutes");
const jockeyRoutes = require("./dashboardRoutes/jockeyRoutes");
const orderRoutes = require("./dashboardRoutes/orderRoutes");
const settingsRoutes = require("./dashboardRoutes/settingsRoutes");

// Sub-routes for the /admin/dashboard path
router.use("/summary", summaryRoutes);  // Handles /admin/dashboard/summary
router.use("/jockeys", jockeyRoutes);   // Handles /admin/dashboard/jockeys
router.use("/orders", orderRoutes);     // Handles /admin/dashboard/orders
router.use("/settings", settingsRoutes); // Handles /admin/dashboard/settings

module.exports = router;
