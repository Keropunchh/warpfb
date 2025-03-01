const express = require("express");
const router = express.Router();

const teamRoutes = require("./teamRoutes");
const matchRoutes = require("./matchRoutes");
const leaguesRoutes = require("./leagueRoutes");
const liveStreamRoutes = require("./liveStreamRoutes");
const livescoreRoutes = require("./livescoreRoutes");

// รวมทุก routes
router.use("/teams", teamRoutes);
router.use("/matches", matchRoutes);
router.use("/leagues", leaguesRoutes);
router.use("/livestreams", liveStreamRoutes);
router.use("/livescore", livescoreRoutes);
module.exports = router;
