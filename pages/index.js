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
        setMatches(matches.filter((match) => match.id !== id));
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
          <col style={{ width: "12%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "12%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>เวลา</th>
            <th>ลีก</th>
            <th>ทีม</th>
            <th>สกอร์</th>
            <th>ลิงค์</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => {
            const matchDate = new Date(match.date);
            const formattedDate = format(matchDate, "yyyy-MM-dd HH:mm");

            return (
              <tr key={index}>
                {/* คอลัมน์เวลา */}
                <td>{formattedDate}</td>

                {/* คอลัมน์ลีก */}
                <td className="logo-text-column">
                  <div className="logo-text-container">
                    <img
                      src={match.league_logo}
                      alt={match.league}
                      width="40"
                    />
                    <span>{match.league}</span>
                  </div>
                </td>

                {/* ✅ คอลัมน์ทีม (จัดให้อยู่ตรงกลางทั้งแนวตั้งและแนวนอน) */}
                <td className="team-column">
                  <div className="team-container">
                    <div className="team">
                      <img
                        src={match.team1_logo}
                        alt={match.team1}
                        width="40"
                      />
                      <span>{match.team1}</span>
                    </div>
                    <span className="vs-text">VS</span>
                    <div className="team">
                      <img
                        src={match.team2_logo}
                        alt={match.team2}
                        width="40"
                      />
                      <span>{match.team2}</span>
                    </div>
                  </div>
                </td>

                {/* คอลัมน์ลิงก์ไลฟ์สกอร์ */}
                <td>
                  <Link href={match.livescore_url}>Link</Link>
                </td>

                {/* คอลัมน์ลิงก์สตรีม */}
                <td className="logo-text-column">
                  <div className="logo-text-container">
                    <img
                      src={match.livestream_logo}
                      alt={match.livestream}
                      width="40"
                    />
                    <Link href={match.livestream_url}>{match.livestream}</Link>
                  </div>
                </td>

                {/* คอลัมน์ปุ่ม */}
                <td>
                  <div className="button-group">
                    <Link href={`/matches/editMatch?id=${match.id}`}>
                      <button className="edit-btn">แก้ไข</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(match.id)}
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
