import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState(null);
  const router = useRouter();
  const [preview, setPreview] = useState("");

  const handleCancel = () => {
    router.push("/teams/mainTeam"); // เปลี่ยนเส้นทางไปยังหน้า teams
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", teamName);
    if (logo) formData.append("logo", logo);

    const response = await fetch("/api/teams", {
      method: "POST",
      body: formData, // ส่งข้อมูลแบบ FormData
    });

    if (response.ok) {
      router.push("/teams/mainTeam");
    } else {
      console.error("Error updating team");
    }
  };

  return (
    <div>
      <h1>เพิ่มทีมใหม่</h1>
      <form onSubmit={handleSubmit}>
        {/* ชื่อทีม */}
        <div className="form-group">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="ชื่อทีม"
            required
          />
        </div>

        {/* เลือกรูปทีม */}
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

        {/* ปุ่มส่งข้อมูล */}
        <div className="form-group">
          <button type="submit">เพิ่มทีม</button>
          <button type="button" onClick={handleCancel} className="delete-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
