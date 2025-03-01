import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditLivescore() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/livescore/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setLink(data.link);
        })
        .catch((error) => console.error("Error fetching livescore:", error));
    }
  }, [id]);

  const handleCancel = () => {
    router.push("/livescore/mainLivescore");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/livescore/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });

    if (response.ok) {
      router.push("/livescore/mainLivescore");
    } else {
      console.error("Error updating livescore");
    }
  };

  return (
    <div>
      <h1>แก้ไข Livescore</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อ"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ลิงก์"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">บันทึก</button>
          <button type="button" onClick={handleCancel} className="delete-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
