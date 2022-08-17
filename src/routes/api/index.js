const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const jobRoutes = require("./jobRoutes");
// const reportRoutes = require("./reportRoutes");
// const dashboardRoutes = require("./dashboardRoutes");
// const folderRoutes = require("./folderRoutes");

let router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/job", jobRoutes);
// router.use("/report", reportRoutes);
// router.use("/dashboard", dashboardRoutes);
// router.use("/folder", folderRoutes);

module.exports = router;
