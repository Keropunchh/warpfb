const express = require("express");
const router = express.Router();

const teamRoutes = require("./teamRoutes");

// รวมทุก routes
router.use("/teams", teamRoutes);

module.exports = router;
