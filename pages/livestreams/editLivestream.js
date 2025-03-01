import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditLivestream() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/livestreams/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setLink(data.link);
          setPreview(data.logo ? data.logo : ""); // แสดงรูปเก่าถ้ามี
        })
        .catch((error) => console.error("Error fetching livestream:", error));
    }
  }, [id]);

  const handleCancel = () => {
    router.push("/livestreams/mainLivestream"); // กลับไปยังหน้ารายการหลัก
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("link", link);
    if (logo) formData.append("logo", logo);

    const response = await fetch(`/api/livestreams/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      router.push("/livestreams/mainLivestream");
    } else {
      console.error("Error updating livestream");
    }
  };

  return (
    <div>
      <h1>แก้ไขช่องไลฟ์</h1>
      <form onSubmit={handleSubmit}>
        {/* ชื่อช่องไลฟ์ */}
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อช่องไลฟ์"
            required
          />
        </div>

        {/* ลิงก์ไลฟ์ */}
        <div className="form-group">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ลิงก์ไลฟ์"
            required
          />
        </div>

        {/* เลือกรูปโลโก้ */}
        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setLogo(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0])); // แสดงรูปที่อัปโหลด
            }}
          />
        </div>

        {/* แสดงตัวอย่างรูป */}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" width="100" />
          </div>
        )}

        {/* ปุ่มบันทึก และปุ่มยกเลิก */}
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
