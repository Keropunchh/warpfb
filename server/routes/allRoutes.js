const express = require("express");
const router = express.Router();

const teamRoutes = require("./teamRoutes");
const matchRoutes = require("./matchRoutes");
const livestreamRoutes = require("./liveStreamRoutes");
const leaguesRoutes = require("./leagueRoutes");
const livescoreRoutes = require("./livescoreRoutes");


// รวมทุก routes
router.use("/teams", teamRoutes);
router.use("/matches", matchRoutes);
router.use("/leagues", leaguesRoutes);
router.use("/livestreams", livestreamRoutes);
router.use("/livescore", livescoreRoutes);
module.exports = router;
