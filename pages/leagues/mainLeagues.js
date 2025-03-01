import { useEffect, useState } from "react";
import Link from "next/link";

export default function League() {
  const [leagues, setLeagues] = useState([]);

  const handleDelete = async (id) => {
    if (!confirm("คุณต้องการลบลีกนี้ใช่หรือไม่?")) return;

    try {
      const response = await fetch(`/api/leagues/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLeagues(leagues.filter((league) => league.id !== id));
      } else {
        console.error("Error deleting league");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("/api/leagues") // เรียก API ที่เชื่อมไปยัง Express
      .then((response) => response.json())
      .then((data) => setLeagues(data))
      .catch((error) => console.error("Error fetching leagues:", error));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>ตารางลีก</h1>
        <Link href="/leagues/addLeagues">
          <button className="add-btn">เพิ่มลีก</button>
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
            <th>ชื่อลีก</th>
            <th>โลโก้</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league, index) => (
            <tr key={index}>
              <td>{league.name}</td>
              <td>
                <img src={league.logo} alt={league.name} width="150" />
              </td>
              <td>
                <Link href={`/leagues/editLeagues?id=${league.id}`}>
                  <button className="edit-btn">แก้ไข</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(league.id)}
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
