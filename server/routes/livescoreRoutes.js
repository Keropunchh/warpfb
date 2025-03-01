const express = require("express");
const router = express.Router();
const livescoreController = require("../controllers/livescoreController");

router.get("/", livescoreController.getAllLivescores);
router.get("/:id", livescoreController.getLivescoreById);
router.post("/", livescoreController.createLivescore);
router.put("/:id", livescoreController.updateLivescore);
router.delete("/:id", livescoreController.deleteLivescore);

module.exports = router;