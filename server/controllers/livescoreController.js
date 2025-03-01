const LivescoreModel = require("../models/LivescoreModel");

// ดึงข้อมูลทั้งหมด
exports.getAllLivescores = (req, res) => {
  LivescoreModel.getAllLivescores((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

// ดึงข้อมูลตาม ID
exports.getLivescoreById = (req, res) => {
  const id = req.params.id;
  LivescoreModel.getLivescoreById(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Livescore not found" });
    } else {
      res.json(results[0]);
    }
  });
};

// เพิ่มข้อมูลใหม่
exports.createLivescore = (req, res) => {
  const { name, link } = req.body;
  LivescoreModel.createLivescore(name, link, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Livescore added successfully", id: result.insertId });
    }
  });
};

// อัปเดตข้อมูล
exports.updateLivescore = (req, res) => {
  const id = req.params.id;
  const { name, link } = req.body;
  LivescoreModel.updateLivescore(id, name, link, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Livescore updated successfully" });
    }
  });
};

// ลบข้อมูล
exports.deleteLivescore = (req, res) => {
  const id = req.params.id;
  LivescoreModel.deleteLivescore(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Livescore deleted successfully" });
    }
  });
};
