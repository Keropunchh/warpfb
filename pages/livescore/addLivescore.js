import { useState } from "react";
import { useRouter } from "next/router";

export default function AddLivescore() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleCancel = () => {
    router.push("/livescore/mainLivescore");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/livescore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });

    if (response.ok) {
      router.push("/livescore/mainLivescore");
    } else {
      console.error("Error adding livescore");
    }
  };

  return (
    <div>
      <h1>เพิ่ม Livescore</h1>
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
          <button type="submit">เพิ่ม</button>
          <button type="button" onClick={handleCancel} className="delete-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
