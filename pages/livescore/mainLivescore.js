import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveScore() {
  const [scores, setScores] = useState([]);

  const handleDelete = async (id) => {
    if (!confirm("คุณต้องการลบสกอร์นี้ใช่หรือไม่?")) return;

    try {
      const response = await fetch(`/api/livescore/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setScores(scores.filter((score) => score.id !== id));
      } else {
        console.error("Error deleting score");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("/api/livescore")
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error("Error fetching livescores:", error));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Livescore Table</h1>
        <Link href="/livescore/addLivescore">
          <button className="add-btn">เพิ่ม</button>
        </Link>
      </div>
      <table>
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>ลิงก์</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.title}</td>
              <td>
                <a href={score.link} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
              <td>
                <Link href={`/livescore/editLivescore?id=${score.id}`}>
                  <button className="edit-btn">แก้ไข</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(score.id)}
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
