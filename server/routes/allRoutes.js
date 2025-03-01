const express = require("express");
const router = express.Router();

const teamRoutes = require("./teamRoutes");
const matchRoutes = require("./matchRoutes");

// รวมทุก routes
router.use("/teams", teamRoutes);
router.use("/matches", matchRoutes);

module.exports = router;
