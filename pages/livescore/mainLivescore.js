import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveScore() {
  const [scores, setScores] = useState([]);

  const handleDelete = async (id, title) => {
    if (!confirm(`คุณต้องการลบสกอร์สด "${title}" ใช่หรือไม่?`)) return;

    try {
      const matchResponse = await fetch(`/api/matches/livescore/${title}`);
      const matches = await matchResponse.json();
      console.log(matches);

      if (matches.length > 0) {
        alert(
          `ไม่สามารถลบสกอร์สด "${title}" ได้ เนื่องจากมีการแข่งขันที่ใช้สกอร์สดนี้อยู่`
        );
        return;
      }

      const deleteResponse = await fetch(`/api/livescore/${id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        setScores(scores.filter((score) => score.id !== id));
      } else {
        console.error("Error deleting livescore");
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
        <h1>ตารางสกอร์สด</h1>
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
                <Link href={score.url}>{score.title}</Link>
              </td>
              <td>
                <div className="button-group">
                  <Link href={`/livescore/editLivescore?id=${score.id}`}>
                    <button className="edit-btn">แก้ไข</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(score.id, score.title)}
                  >
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
