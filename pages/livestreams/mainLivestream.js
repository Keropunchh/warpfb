import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveStream() {
  const [streams, setStreams] = useState([]);

  const handleDelete = async (id) => {
    if (!confirm("คุณต้องการลบช่องไลฟ์นี้ใช่หรือไม่?")) return;

    try {
      const response = await fetch(`/api/livestreams/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStreams(streams.filter((stream) => stream.id !== id));
      } else {
        console.error("Error deleting stream");
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
          <col style={{ width: "30%" }} />
          <col style={{ width: "10%" }} />
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
              <td>{stream.name}</td>
              <td>
                <a href={stream.link} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
              <td>
                <img src={stream.logo} alt={stream.name} width="100" />
              </td>
              <td>
                <Link href={`/livestreams/editLivestream?id=${stream.id}`}>
                  <button className="edit-btn">แก้ไข</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(stream.id)}
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
