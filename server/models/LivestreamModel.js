const db = require("../config/db");

class LiveStreamModel {
  static getAllLiveStreams(callback) {
    db.query("SELECT * FROM live_streams", callback);
  }

  static getLiveStreamById(id, callback) {
    db.query("SELECT * FROM live_streams WHERE id = ?", [id], callback);
  }

  static createLiveStream(name, link, logo, callback) {
    db.query(
      "INSERT INTO live_streams (title, url, logo) VALUES (?, ?, ?)",
      [name, link, logo],
      callback
    );
  }

  static updateLiveStream(id, name, link, logo, callback) {
    db.query(
      "UPDATE live_streams SET title = ?, url = ?, logo = ? WHERE id = ?",
      [name, link, logo, id],
      callback
    );
  }

  static deleteLiveStream(id, callback) {
    db.query("DELETE FROM live_streams WHERE id = ?", [id], callback);
  }
}


module.exports = LiveStreamModel;
