import { useEffect, useState } from "react";
import Link from "next/link";

export default function Team() {
  const [teams, setTeams] = useState([]);

  const handleDelete = async (id, name) => {
    if (!confirm(`คุณต้องการลบทีม "${name}" ใช่หรือไม่?`)) return;

    try {
      const matchResponse = await fetch(`/api/matches/team/${name}`);
      const matches = await matchResponse.json();
      console.log(matches);

      if (matches.length > 0) {
        alert(
          `ไม่สามารถลบทีม "${name}" ได้ เนื่องจากมีการแข่งขันที่ใช้ทีมนี้อยู่`
        );
        return;
      }

      const deleteResponse = await fetch(`/api/teams/${id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        setTeams(teams.filter((team) => team.id !== id));
      } else {
        console.error("Error deleting team");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("/api/teams") // เรียก API ที่เชื่อมไปยัง Express
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>ตารางทีม</h1>
        <Link href="/teams/addTeam">
          <button className="add-btn">เพิ่มทีม</button>
        </Link>
      </div>
      <table>
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ชื่อทีม</th>
            <th>โลโก้</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
              <td>
                <img src={team.logo} alt={team.name} width="150" />
              </td>
              <td>
                <Link href={`/teams/editTeam?id=${team.id}`}>
                  <button className="edit-btn">แก้ไข</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(team.id, team.name)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
