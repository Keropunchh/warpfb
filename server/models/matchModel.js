const db = require("../config/db");

class Match {
  static getAllMatches(callback) {
    const query = `
        SELECT 
            m.id, 
            m.date, 
            m.time, 
            m.team1, 
            t1.logo AS team1_logo, 
            m.team2, 
            t2.logo AS team2_logo, 
            m.league, 
            l.logo AS league_logo, 
            m.livescore, 
            ls.url AS livescore_url, 
            m.livestream, 
            s.url AS livestream_url,
            s.logo AS livestream_logo
        FROM matches m
        JOIN teams t1 ON m.team1 = t1.name
        JOIN teams t2 ON m.team2 = t2.name
        JOIN leagues l ON m.league = l.name
        JOIN livescore ls ON m.livescore = ls.title
        JOIN live_streams s ON m.livestream = s.title
        ORDER BY m.date;
    `;
    db.query(query, callback);
  }

  static getMatchById(id, callback) {
    const query = `
        SELECT 
            m.id, 
            m.date, 
            m.time, 
            m.team1, 
            t1.logo AS team1_logo, 
            m.team2, 
            t2.logo AS team2_logo, 
            m.league, 
            l.logo AS league_logo, 
            m.livescore, 
            ls.url AS livescore_url, 
            m.livestream, 
            s.url AS livestream_url,
            s.logo AS livestream_logo
        FROM matches m
        JOIN teams t1 ON m.team1 = t1.name
        JOIN teams t2 ON m.team2 = t2.name
        JOIN leagues l ON m.league = l.name
        JOIN livescore ls ON m.livescore = ls.title
        JOIN live_streams s ON m.livestream = s.title
        WHERE m.id = ?
    `;
    db.query(query, [id], callback);
  }

  static getMatchByLeague(name, callback) {
    const query = `
        SELECT 
            m.id, 
            m.date, 
            m.time, 
            m.team1, 
            t1.logo AS team1_logo, 
            m.team2, 
            t2.logo AS team2_logo, 
            m.league, 
            l.logo AS league_logo, 
            m.livescore, 
            ls.url AS livescore_url, 
            m.livestream, 
            s.url AS livestream_url,
            s.logo AS livestream_logo
        FROM matches m
        JOIN teams t1 ON m.team1 = t1.name
        JOIN teams t2 ON m.team2 = t2.name
        JOIN leagues l ON m.league = l.name
        JOIN livescore ls ON m.livescore = ls.title
        JOIN live_streams s ON m.livestream = s.title
        WHERE m.league = ?
    `;
    db.query(query, [name], callback);
  }

  static getMatchByTeam(name, callback) {
    const query = `
        SELECT 
            m.id, 
            m.date, 
            m.time, 
            m.team1, 
            t1.logo AS team1_logo, 
            m.team2, 
            t2.logo AS team2_logo, 
            m.league, 
            l.logo AS league_logo, 
            m.livescore, 
            ls.url AS livescore_url, 
            m.livestream, 
            s.url AS livestream_url,
            s.logo AS livestream_logo
        FROM matches m
        JOIN teams t1 ON m.team1 = t1.name
        JOIN teams t2 ON m.team2 = t2.name
        JOIN leagues l ON m.league = l.name
        JOIN livescore ls ON m.livescore = ls.title
        JOIN live_streams s ON m.livestream = s.title
        WHERE (m.team1 = ? OR m.team2 = ?)
    `;
    db.query(query, [name, name], callback);
  }

  static getMatchByLivescore(title, callback) {
    const query = `
        SELECT 
            m.id, 
            m.date, 
            m.time, 
            m.team1, 
            t1.logo AS team1_logo, 
            m.team2, 
            t2.logo AS team2_logo, 
            m.league, 
            l.logo AS league_logo, 
            m.livescore, 
            ls.url AS livescore_url, 
            m.livestream, 
            s.url AS livestream_url,
            s.logo AS livestream_logo
        FROM matches m
        JOIN teams t1 ON m.team1 = t1.name
        JOIN teams t2 ON m.team2 = t2.name
        JOIN leagues l ON m.league = l.name
        JOIN livescore ls ON m.livescore = ls.title
        JOIN live_streams s ON m.livestream = s.title
        WHERE m.livescore = ?
    `;
    db.query(query, [title], callback);
  }

  static getMatchByLivestream(title, callback) {
    const query = `
        SELECT 
            m.id, 
            m.date, 
            m.time, 
            m.team1, 
            t1.logo AS team1_logo, 
            m.team2, 
            t2.logo AS team2_logo, 
            m.league, 
            l.logo AS league_logo, 
            m.livescore, 
            ls.url AS livescore_url, 
            m.livestream, 
            s.url AS livestream_url,
            s.logo AS livestream_logo
        FROM matches m
        JOIN teams t1 ON m.team1 = t1.name
        JOIN teams t2 ON m.team2 = t2.name
        JOIN leagues l ON m.league = l.name
        JOIN livescore ls ON m.livescore = ls.title
        JOIN live_streams s ON m.livestream = s.title
        WHERE m.livestream = ?
    `;
    db.query(query, [title], callback);
  }

  static createMatch(
    date,
    time,
    team1,
    team2,
    league,
    livescore,
    livestream,
    callback
  ) {
    db.query(
      "INSERT INTO matches (date, time, team1, team2, league, livescore, livestream) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [date, time, team1, team2, league, livescore, livestream],
      callback
    );
  }

  static updateMatch(
    id,
    date,
    time,
    team1,
    team2,
    league,
    livescore,
    livestream,
    callback
  ) {
    db.query(
      "UPDATE matches SET date = ?, time = ?, team1 = ?, team2 = ?, league = ?, livescore = ?, livestream = ? WHERE id = ?",
      [date, time, team1, team2, league, livescore, livestream, id],
      callback
    );
  }

  static deleteMatch(id, callback) {
    db.query("DELETE FROM matches WHERE id = ?", [id], callback);
  }
}

module.exports = Match;
