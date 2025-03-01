const LiveStreamModel = require("../models/LivestreamModel");

// ดึงข้อมูลทั้งหมด
exports.getAllLiveStreams = (req, res) => {
  LiveStreamModel.getAllLiveStreams((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

// ดึงข้อมูลตาม ID
exports.getLiveStreamById = (req, res) => {
  const id = req.params.id;
  LiveStreamModel.getLiveStreamById(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: "LiveStream not found" });
    } else {
      res.json(results[0]);
    }
  });
};

// เพิ่มข้อมูลใหม่
exports.createLiveStream = (req, res) => {
  const { name, link } = req.body;
  const logo = req.file ? `/images/livestreams/${req.file.filename}` : null; // จัดเก็บ path ของโลโก้

  LiveStreamModel.createLiveStream(name, link, logo, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "LiveStream added successfully", id: result.insertId });
    }
  });
};

// อัปเดตข้อมูล
exports.updateLiveStream = (req, res) => {
  const id = req.params.id;
  const { name, link } = req.body;
  const logo = req.file ? `/images/livestreams/${req.file.filename}` : null; // ตรวจสอบว่ามีไฟล์อัปโหลดไหม

  LiveStreamModel.updateLiveStream(id, name, link, logo, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "LiveStream updated successfully" });
    }
  });
};

// ลบข้อมูล
exports.deleteLiveStream = (req, res) => {
  const id = req.params.id;
  LiveStreamModel.deleteLiveStream(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "LiveStream deleted successfully" });
    }
  });
};
