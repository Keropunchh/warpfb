const db = require("../config/db");

class LiveStreamModel {
  static getAllLiveStreams(callback) {
    db.query("SELECT * FROM livestreams", callback);
  }

  static getLiveStreamById(id, callback) {
    db.query("SELECT * FROM livestreams WHERE id = ?", [id], callback);
  }

  static createLiveStream(name, link, logo, callback) {
    db.query("INSERT INTO livestreams (name, link, logo) VALUES (?, ?, ?)", [name, link, logo], callback);
  }

  static updateLiveStream(id, name, link, logo, callback) {
    db.query("UPDATE livestreams SET name = ?, link = ?, logo = ? WHERE id = ?", [name, link, logo, id], callback);
  }

  static deleteLiveStream(id, callback) {
    db.query("DELETE FROM livestreams WHERE id = ?", [id], callback);
  }
}

module.exports = LiveStreamModel;
