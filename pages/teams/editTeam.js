import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditTeam() {
  const router = useRouter();
  const { id } = router.query;
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [existingTeams, setExistingTeams] = useState([]); // เก็บทีมที่มีอยู่แล้ว
  const [error, setError] = useState(""); // ข้อความแสดงข้อผิดพลาด

  useEffect(() => {
    if (id) {
      // ดึงข้อมูลทีมปัจจุบัน
      fetch(`/api/teams/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTeamName(data.name);
          setPreview(data.logo ? data.logo : ""); // แสดงโลโก้เก่าถ้ามี
        })
        .catch((error) => console.error("Error fetching team:", error));

      // ดึงข้อมูลทีมทั้งหมดเพื่อเช็คความซ้ำซ้อน
      fetch("/api/teams")
        .then((response) => response.json())
        .then((data) => setExistingTeams(data))
        .catch((error) => console.error("Error fetching teams:", error));
    }
  }, [id]);

  // ฟังก์ชันตรวจสอบอักขระพิเศษ
  const validateTeamName = (name) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; // ตรวจอักขระพิเศษ
    return !specialCharRegex.test(name);
  };

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการแก้ไขทีมใหม่หรือไม่?")) {
      router.push("/teams/mainTeam");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่าชื่อทีมไม่เว้นว่าง
    if (!teamName.trim()) {
      alert("กรุณากรอกชื่อทีม");
      return;
    }

    // ตรวจสอบอักขระพิเศษ
    if (!validateTeamName(teamName)) {
      alert("ชื่อทีมต้องไม่มีอักขระพิเศษ");
      return;
    }

    // ตรวจสอบว่าชื่อทีมซ้ำหรือไม่
    const isDuplicate = existingTeams.some(
      (team) =>
        team.name.toLowerCase() === teamName.toLowerCase() && team.id !== id
    );

    if (isDuplicate) {
      alert("ชื่อทีมนี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น");
      return;
    }

    // สร้าง FormData เพื่ออัปเดตข้อมูล
    const formData = new FormData();
    formData.append("name", teamName);
    if (logo) formData.append("logo", logo);

    const response = await fetch(`/api/teams/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("บันทึกข้อมูลสำเร็จ");
      router.push("/teams/mainTeam");
    } else {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="form-container">
      <h1>แก้ไขข้อมูลทีม</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อทีม</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="ชื่อทีม"
            required
          />
        </div>

        <div className="form-group">
          <label>โลโก้ทีม</label>
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
          <button type="submit" className="save-btn">
            บันทึก
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
