import { useState } from "react";
import { useRouter } from "next/router";

export default function AddLivestream() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const router = useRouter();

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการเพิ่มไลฟ์สดหรือไม่?")) {
      router.push("/livestreams/mainLivestream");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("link", link);
    if (logo) formData.append("logo", logo);

    const response = await fetch("/api/livestreams", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      router.push("/livestreams/mainLivestream");
    } else {
      console.error("Error adding livestream");
    }
  };

  return (
    <div className="form-container">
      <h1>เพิ่มช่องไลฟ์</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อช่องไลฟ์</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อช่องไลฟ์"
            required
          />
        </div>

        <div className="form-group">
          <label>ลิงก์ไลฟ์</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ลิงก์ไลฟ์"
            required
          />
        </div>

        <div className="form-group">
          <label>โลโก้ไลฟ์</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setLogo(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" width="100" />
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="add-btn">
            เพิ่มช่องไลฟ์
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
