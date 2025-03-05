const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.get("/league/:name", matchController.getMatchByLeague);
router.get("/team/:name", matchController.getMatchByTeam);
router.get("/livescore/:title", matchController.getMatchByLivescore);
router.get("/livestream/:title", matchController.getMatchByLivestream);
router.post("/", matchController.createMatch);
router.put("/:id", matchController.updateMatch);
router.delete("/:id", matchController.deleteMatch);

module.exports = router;
