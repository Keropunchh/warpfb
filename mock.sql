CREATE DATABASE warpfb_Project;
USE warpfb_Project;

CREATE TABLE live_streams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  logo VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE livescore (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE leagues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    team1 VARCHAR(100) NOT NULL,
    team2 VARCHAR(100) NOT NULL,
    league VARCHAR(100) NOT NULL,
    livescore VARCHAR(50),
    livestream VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 

INSERT INTO live_streams (title, url, logo) VALUES
('TrueVisions Football', 'https://www.truevisions.co.th/live', '/images/teams/1740411294154.jpg'),
('BeIN Sports Stream', 'https://www.beinsports.com/live', '/images/teams/1740411294154.jpg');

INSERT INTO livescore (title, url) VALUES
('LiveScore', 'https://www.livescore.com'),
('ESPN Scoreboard', 'https://www.espn.com/soccer/scoreboard');

INSERT INTO teams (name, logo) VALUES
('Manchester City', '/images/teams/1740411294154.jpg'),
('Real Madrid', '/images/teams/1740411294154.jpg');

INSERT INTO leagues (name, logo) VALUES
('Premier League', '/images/teams/1740411294154.jpg'),
('La Liga', '/images/teams/1740411294154.jpg'),
('UEFA Champions League', '/images/teams/1740411294154.jpg');

INSERT INTO matches (date, time, team1, team2, league, livescore, livestream)
VALUES
('2025-03-01', '19:00', 'Manchester City', 'Real Madrid', 'UEFA Champions League','LiveScore', 'TrueVisions Football'),
('2025-03-02', '21:00', 'Manchester City', 'Real Madrid', 'UEFA Champions League','LiveScore', 'TrueVisions Football');

SELECT * FROM teams;
SELECT * FROM leagues;
SELECT * FROM livescore;
SELECT * FROM live_streams;
SELECT * FROM matches;

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
