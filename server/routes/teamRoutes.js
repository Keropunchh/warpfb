const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const teamController = require("../controllers/teamController");

// ตั้งค่าการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/teams/"); // เก็บไฟล์ที่ public/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
  },
});
const upload = multer({ storage: storage });

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.post("/", upload.single("logo"), teamController.createTeam);
router.put("/:id", upload.single("logo"), teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
