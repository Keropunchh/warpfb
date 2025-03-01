const db = require("../config/db");

class League {
  static getAllLeagues(callback) {
    db.query("SELECT * FROM leagues", callback);
  }

  static getLeagueById(id, callback) {
    db.query("SELECT * FROM leagues WHERE id = ?", [id], callback);
  }

  static createLeague(name, logo, callback) {
    db.query(
      "INSERT INTO leagues (name, logo) VALUES (?, ?)",
      [name, logo],
      callback
    );
  }

  static updateLeague(id, name, logo, callback) {
    db.query(
      "UPDATE leagues SET name = ?, logo = ? WHERE id = ?",
      [name, logo, id],
      callback
    );
  }

  static deleteLeague(id, callback) {
    db.query("DELETE FROM leagues WHERE id = ?", [id], callback);
  }
}

module.exports = League;
