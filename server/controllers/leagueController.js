const League = require("../models/leagueModel"); // ✅ เปลี่ยนเป็น leagueModel
const fs = require("fs");
const path = require("path");

// 📌 ดึงข้อมูลลีกทั้งหมด
exports.getAllLeagues = (req, res) => {
  League.getAllLeagues((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 📌 ดึงข้อมูลลีกตาม ID
exports.getLeagueById = (req, res) => {
  League.getLeagueById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "League not found" });
    res.json(result[0]);
  });
};

// 📌 เพิ่มข้อมูลลีกใหม่
exports.createLeague = (req, res) => {
  const { name } = req.body;
  const logo = req.file ? `/images/leagues/${req.file.filename}` : null; // ✅ เปลี่ยน path เป็น leagues

  if (!name || !logo) {
    return res.status(400).json({ error: "กรุณาใส่ชื่อลีกและอัปโหลดโลโก้" });
  }

  League.createLeague(name, logo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, logo });
  });
};

// 📌 อัปเดตข้อมูลลีก
exports.updateLeague = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newLogo = req.file ? `/images/leagues/${req.file.filename}` : null; // ✅ เปลี่ยน path เป็น leagues

  // ค้นหาข้อมูลลีกจากฐานข้อมูล
  League.getLeagueById(id, (err, league) => {
    if (err || !league) {
      return res.status(404).json({ error: "ไม่พบลีกนี้" });
    }

    let oldLogoPath = league[0].logo
      ? path.join(__dirname, "..", "..", "public", league[0].logo)
      : null;

    // ถ้ามีการอัปโหลดไฟล์ใหม่ ให้ลบรูปเก่าออก
    if (newLogo && oldLogoPath && fs.existsSync(oldLogoPath)) {
      fs.unlink(oldLogoPath, (err) => {
        if (err) console.error("ลบรูปเก่าไม่สำเร็จ:", err);
      });
    }

    // อัปเดตข้อมูลลีก
    League.updateLeague(id, name, newLogo || league[0].logo, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, logo: newLogo || league[0].logo });
    });
  });
};

// 📌 ลบข้อมูลลีก
exports.deleteLeague = (req, res) => {
  League.deleteLeague(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "League deleted successfully" });
  });
};
