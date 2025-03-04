import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveStream() {
  const [streams, setStreams] = useState([]);

  const handleDelete = async (id, title) => {
    if (!confirm(`คุณต้องการลบช่องไลฟ์ "${title}" ใช่หรือไม่?`)) return;

    try {
      const matchResponse = await fetch(`/api/matches/livestream/${title}`);
      const matches = await matchResponse.json();
      console.log(matches);

      if (matches.length > 0) {
        alert(
          `ไม่สามารถลบช่องไลฟ์ "${title}" ได้ เนื่องจากมีการแข่งขันที่ใช้ช่องไลฟ์นี้อยู่`
        );
        return;
      }

      const deleteResponse = await fetch(`/api/livestreams/${id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        setStreams(streams.filter((stream) => stream.id !== id));
      } else {
        console.error("Error deleting livestream");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("/api/livestreams") // เรียก API ที่เชื่อมไปยัง Express
      .then((response) => response.json())
      .then((data) => setStreams(data))
      .catch((error) => console.error("Error fetching streams:", error));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Live Channel Table</h1>
        <Link href="/livestreams/addLivestream">
          <button className="add-btn">เพิ่ม</button>
        </Link>
      </div>
      <table>
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>ลิงก์</th>
            <th>โลโก้</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {streams.map((stream, index) => (
            <tr key={index}>
              <td>{stream.title}</td>
              <td>
                <a href={stream.link} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
              <td>
                <img src={stream.logo} alt={stream.title} width="100" />
              </td>
              <td>
                <Link href={`/livestreams/editLivestream?id=${stream.id}`}>
                  <button className="edit-btn">แก้ไข</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(stream.id, stream.title)}
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
