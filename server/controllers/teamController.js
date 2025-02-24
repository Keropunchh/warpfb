const Team = require("../models/teamModel");
const fs = require("fs");
const path = require("path");

exports.getAllTeams = (req, res) => {
  Team.getAllTeams((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getTeamById = (req, res) => {
  Team.getTeamById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Team not found" });
    res.json(result[0]);
  });
};

exports.createTeam = (req, res) => {
  const { name } = req.body;
  const logo = req.file ? `/images/teams/${req.file.filename}` : null; // ดึง path ของไฟล์

  if (!name || !logo) {
    return res.status(400).json({ error: "กรุณาใส่ชื่อทีมและอัปโหลดโลโก้" });
  }

  Team.createTeam(name, logo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, logo });
  });
};

exports.updateTeam = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newLogo = req.file ? `/images/teams/${req.file.filename}` : null; // ดึง path ของไฟล์

  // ค้นหาข้อมูลทีมจากฐานข้อมูล
  Team.getTeamById(id, (err, team) => {
    if (err || !team) {
      return res.status(404).json({ error: "ไม่พบทีมนี้" });
    }

    let oldLogoPath = team[0].logo
      ? path.join(__dirname, "..", "..", "public", team[0].logo)
      : null;

    // ถ้ามีการอัปโหลดไฟล์ใหม่ ให้ลบรูปเก่าออก
    if (newLogo && oldLogoPath && fs.existsSync(oldLogoPath)) {
      fs.unlink(oldLogoPath, (err) => {
        if (err) console.error("ลบรูปเก่าไม่สำเร็จ:", err);
      });
    }

    // อัปเดตข้อมูลทีม
    Team.updateTeam(id, name, newLogo || team[0].logo, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, logo: newLogo || team[0].logo });
    });
  });
};

exports.deleteTeam = (req, res) => {
  Team.deleteTeam(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Team deleted successfully" });
  });
};
