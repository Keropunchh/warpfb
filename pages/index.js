import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

export default function Home() {
  const [matches, setMatches] = useState([]);

  const handleDelete = async (id) => {
    if (!confirm("คุณต้องการลบคู่นี้ใช่หรือไม่?")) return;

    try {
      const response = await fetch(`/api/matches/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMatches(matches.filter((matches) => matches.id !== id));
      } else {
        console.error("Error deleting matches");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("/api/matches") // เรียก API ที่เชื่อมไปยัง Express
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>ตารางแข่ง</h1>
        <Link href="/matches/addMatch">
          <button className="add-btn">เพิ่ม</button>
        </Link>
      </div>
      <table>
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "18%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>เวลา</th>
            <th>ลีค</th>
            <th>ทีม</th>
            <th>สกอร์</th>
            <th>ลิงค์</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => {
            const matchDate = new Date(match.date);
            const formattedDate = format(matchDate, "yyyy-MM-dd");

            return (
              <tr key={index}>
                <td>
                  {formattedDate} {match.time}
                </td>
                <td>
                  <img src={match.league_logo} alt={match.league} width="50" />
                  <p>{match.league}</p>
                </td>
                <td>
                  <img src={match.team1_logo} alt={match.team1} width="50" />
                  {match.team1} VS {match.team2}
                  <img src={match.team2_logo} alt={match.team} width="50" />
                </td>
                <td>
                  <Link href={match.livescore_url}>{match.livescore}</Link>
                </td>
                <td>
                  <img
                    src={match.livestream_logo}
                    alt={match.livestream}
                    width="50"
                  />
                  <Link href={match.livestream_url}>{match.livestream}</Link>
                </td>
                <td>
                  <Link href={`/matches/editMatch?id=${match.id}`}>
                    <button className="edit-btn">แก้ไข</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(match.id)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
