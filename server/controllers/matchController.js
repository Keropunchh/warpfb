const Match = require("../models/matchModel");
const fs = require("fs");
const path = require("path");

exports.getAllMatches = (req, res) => {
  Match.getAllMatches((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getMatchById = (req, res) => {
  Match.getMatchById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Match not found" });
    res.json(result[0]);
  });
};

exports.getMatchByLeague = (req, res) => {
  Match.getMatchByLeague(req.params.name, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Match not found" });
    res.json(result);
  });
};

exports.getMatchByTeam = (req, res) => {
  Match.getMatchByTeam(req.params.name, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Match not found" });
    res.json(result);
  });
};

exports.getMatchByLivescore = (req, res) => {
  Match.getMatchByLivescore(req.params.title, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Match not found" });
    res.json(result);
  });
};

exports.getMatchByLivestream = (req, res) => {
  Match.getMatchByLivestream(req.params.title, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Match not found" });
    res.json(result);
  });
};

exports.createMatch = (req, res) => {
  const { date, time, team1, team2, league, livescore, livestream } = req.body;

  if (
    !date ||
    !time ||
    !team1 ||
    !team2 ||
    !league ||
    !livescore ||
    !livestream
  ) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  Match.createMatch(
    date,
    time,
    team1,
    team2,
    league,
    livescore,
    livestream,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: result.insertId,
        date,
        time,
        team1,
        team2,
        livescore,
        livestream,
      });
    }
  );
};

exports.updateMatch = (req, res) => {
  const { id } = req.params;
  const { date, time, team1, team2, league, livescore, livestream } = req.body;

  if (
    !date ||
    !time ||
    !team1 ||
    !team2 ||
    !livescore ||
    !livestream ||
    !league
  ) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  Match.updateMatch(
    id,
    date,
    time,
    team1,
    team2,
    league,
    livescore,
    livestream,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, date, time, team1, team2, livescore, livestream });
    }
  );
};

exports.deleteMatch = (req, res) => {
  Match.deleteMatch(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Match deleted successfully" });
  });
};
