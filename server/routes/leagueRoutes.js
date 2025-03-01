const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const leagueController = require("../controllers/leagueController");

// ตั้งค่าการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/leagues/"); // เก็บไฟล์ที่ public/images/leagues/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
  },
});
const upload = multer({ storage: storage });

// กำหนดเส้นทาง API
router.get("/", leagueController.getAllLeagues);
router.get("/:id", leagueController.getLeagueById);
router.post("/", upload.single("logo"), leagueController.createLeague);
router.put("/:id", upload.single("logo"), leagueController.updateLeague);
router.delete("/:id", leagueController.deleteLeague);

module.exports = router;
