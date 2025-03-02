const db = require("../config/db");

class LivescoreModel {
  // ดึงข้อมูลทั้งหมด
  static getAllLivescores(callback) {
    db.query("SELECT * FROM livescore", callback);
  }

  // ดึงข้อมูลตาม ID
  static getLivescoreById(id, callback) {
    db.query("SELECT * FROM livescore WHERE id = ?", [id], callback);
  }

  // เพิ่มข้อมูลใหม่
  static createLivescore(name, link, callback) {
    db.query(
      "INSERT INTO livescore (title, url) VALUES (?, ?)",
      [name, link],
      callback
    );
  }

  // อัปเดตข้อมูล
  static updateLivescore(id, name, link, callback) {
    db.query(
      "UPDATE livescore SET title = ?, url = ? WHERE id = ?",
      [name, link, id],
      callback
    );
  }

  // ลบข้อมูล
  static deleteLivescore(id, callback) {
    db.query("DELETE FROM livescore WHERE id = ?", [id], callback);
  }
}

module.exports = LivescoreModel;
