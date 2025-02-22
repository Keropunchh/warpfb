const Team = require("../models/teamModel");

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
  const { name, logo } = req.body;
  Team.createTeam(name, logo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, logo });
  });
};

exports.updateTeam = (req, res) => {
  const { name, logo } = req.body;
  Team.updateTeam(req.params.id, name, logo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Team updated successfully" });
  });
};

exports.deleteTeam = (req, res) => {
  Team.deleteTeam(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Team deleted successfully" });
  });
};
