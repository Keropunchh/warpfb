const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const liveStreamController = require("../controllers/liveStreamController");

// ตั้งค่าการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/livestreams/"); // เก็บไฟล์ที่ public/images/livestreams/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
  },
});
const upload = multer({ storage });

router.get("/", liveStreamController.getAllLiveStreams);
router.get("/:id", liveStreamController.getLiveStreamById);
router.post("/", upload.single("logo"), liveStreamController.createLiveStream);
router.put("/:id", upload.single("logo"), liveStreamController.updateLiveStream);
router.delete("/:id", liveStreamController.deleteLiveStream);

module.exports = router;
