import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditMatch() {
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    fetch("/api/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));

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

  // โหลดข้อมูลแมตช์ตาม id
  useEffect(() => {
    if (id) {
      fetch(`/api/matches/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMatchDate(data.date);
          setMatchTime(data.time);
          setSelectedTeam1(data.team1);
          setSelectedTeam2(data.team2);
          setSelectedLeague(data.league);
          setSelectedLivescore(data.livescore);
          setSelectedLivestream(data.livestream);
        })
        .catch((error) => console.error("Error fetching match:", error));
    }
  }, [id]);

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการแก้ไขแมตช์หรือไม่?")) {
      router.push("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const matchData = {
      id: id, // ใช้ id ที่ได้จาก router.query
      date: matchDate,
      time: matchTime,
      team1: selectedTeam1,
      team2: selectedTeam2,
      league: selectedLeague,
      livescore: selectedLivescore,
      livestream: selectedLivestream,
    };

    console.log("Updating match:", matchData);

    const response = await fetch(`/api/matches/${id}`, {
      method: "PUT", // ใช้ PUT แทน POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    });

    if (response.ok) {
      router.push("/"); // กลับไปหน้าหลักหลังจากอัปเดตสำเร็จ
    } else {
      console.error("Error updating match:", await response.text());
    }
  };

  return (
    <div className="form-container">
      <h1>แก้ไขแมตช์</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>เลือกวัน : </label>
          <input
            type="date"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>เลือกเวลา : </label>
          <input
            type="time"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
            required
          />
        </div>

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

        <div className="form-group">
          <button type="submit">แก้ไขแมตช์</button>
          <button type="button" onClick={handleCancel} className="delete-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
