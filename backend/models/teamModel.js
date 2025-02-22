const db = require("../config/db");

class Team {
  static getAllTeams(callback) {
    db.query("SELECT * FROM teams", callback);
  }

  static getTeamById(id, callback) {
    db.query("SELECT * FROM teams WHERE id = ?", [id], callback);
  }

  static createTeam(name, logo, callback) {
    db.query(
      "INSERT INTO teams (name, logo) VALUES (?, ?)",
      [name, logo],
      callback
    );
  }

  static updateTeam(id, name, logo, callback) {
    db.query(
      "UPDATE teams SET name = ?, logo = ? WHERE id = ?",
      [name, logo, id],
      callback
    );
  }

  static deleteTeam(id, callback) {
    db.query("DELETE FROM teams WHERE id = ?", [id], callback);
  }
}

module.exports = Team;
