import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMatch() {
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [selectedTeam1, setSelectedTeam1] = useState("");
  const [selectedTeam2, setSelectedTeam2] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedLivescore, setSelectedLivescore] = useState("");
  const [selectedLivestream, setSelectedLivestream] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [livescore, setLivescore] = useState([]);
  const [liveStreams, setLiveStreams] = useState([]);
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/teams") // เรียก API ที่เชื่อมไปยัง Express
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching matches:", error));

    fetch("/api/leagues")
      .then((response) => response.json())
      .then((data) => setLeagues(data))
      .catch((error) => console.error("Error fetching leagues:", error));

    fetch("/api/livescore")
      .then((response) => response.json())
      .then((data) => setLivescore(data))
      .catch((error) => console.error("Error fetching livescore:", error));

    fetch("/api/livestreams")
      .then((response) => response.json())
      .then((data) => setLiveStreams(data))
      .catch((error) => console.error("Error fetching livestreams:", error));
  }, []);

  const handleCancel = () => {
    router.push("/index");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // สร้าง object ที่มีข้อมูลของแมตช์
    const matchData = {
      date: matchDate,
      time: matchTime,
      team1: selectedTeam1,
      team2: selectedTeam2,
      league: selectedLeague,
      livescore: selectedLivescore,
      livestream: selectedLivestream,
    };

    console.log("Sending data:", matchData); // Debugging log

    const response = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // แจ้งให้ Backend รู้ว่ากำลังส่ง JSON
      },
      body: JSON.stringify(matchData),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Error adding match:", await response.text());
    }
  };

  return (
    <div className="form-container">
      <h1>เพิ่มแมตช์ใหม่</h1>
      <form onSubmit={handleSubmit}>
        {/* เลือกวัน */}
        <div className="form-group">
          <label>เลือกวัน : </label>
          <input
            type="date"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
            required
          />
        </div>

        {/* เลือกเวลา */}
        <div className="form-group">
          <label>เลือกเวลา : </label>
          <input
            type="time"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
            required
          />
        </div>

        {/* Dropdown เลือกทีม */}
        <div className="form-group">
          <label>เลือกทีม 1 : </label>
          <select
            value={selectedTeam1}
            onChange={(e) => setSelectedTeam1(e.target.value)}
            required
          >
            <option value="">-- เลือกทีม --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>เลือกทีม 2 : </label>
          <select
            value={selectedTeam2}
            onChange={(e) => setSelectedTeam2(e.target.value)}
            required
          >
            <option value="">-- เลือกทีม --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown เลือกลีค */}
        <div className="form-group">
          <label>เลือกลีก : </label>
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            required
          >
            <option value="">-- เลือกลีค --</option>
            {leagues.map((league) => (
              <option key={league.id} value={league.name}>
                {league.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown เลือกลิงค์ livescore */}
        <div className="form-group">
          <label>เลือก Livescore : </label>
          <select
            value={selectedLivescore}
            onChange={(e) => setSelectedLivescore(e.target.value)}
            required
          >
            <option value="">-- เลือกลิงค์ Livescore --</option>
            {livescore.map((score) => (
              <option key={score.id} value={score.title}>
                {score.title}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown เลือกลิงค์ livestream */}
        <div className="form-group">
          <label>เลือก Livestream : </label>
          <select
            value={selectedLivestream}
            onChange={(e) => setSelectedLivestream(e.target.value)}
            required
          >
            <option value="">-- เลือกลิงค์ Livestream --</option>
            {liveStreams.map((stream) => (
              <option key={stream.id} value={stream.title}>
                {stream.title}
              </option>
            ))}
          </select>
        </div>

        {/* ปุ่มส่งข้อมูล */}
        <div className="form-group">
          <button type="submit">เพิ่มแมตช์</button>
          <button type="button" onClick={handleCancel} className="delete-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
