import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState(null);
  const [existingTeams, setExistingTeams] = useState([]); // เก็บรายชื่อทีมที่มีอยู่แล้ว
  const [preview, setPreview] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ✅ ดึงข้อมูลทีมทั้งหมดเพื่อตรวจสอบชื่อซ้ำ
    fetch("/api/teams")
      .then((response) => response.json())
      .then((data) => setExistingTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  // ✅ ฟังก์ชันตรวจสอบอักขระพิเศษ
  const validateTeamName = (name) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; 
    return !specialCharRegex.test(name);
  };

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการเพิ่มทีมใหม่หรือไม่?")) {
      router.push("/teams/mainTeam");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบว่าชื่อว่างหรือไม่
    if (!teamName.trim()) {
      alert("❌ กรุณากรอกชื่อทีม");
      return;
    }

    // ✅ ตรวจสอบอักขระพิเศษ
    if (!validateTeamName(teamName)) {
      alert("❌ ชื่อทีมต้องไม่มีอักขระพิเศษ เช่น !@#$%^&*()");
      return;
    }

    // ✅ ตรวจสอบว่าชื่อทีมซ้ำหรือไม่
    const isDuplicate = existingTeams.some(
      (team) => team.name.toLowerCase() === teamName.toLowerCase()
    );

    if (isDuplicate) {
      alert("❌ ชื่อทีมนี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น");
      return;
    }

    // ✅ สร้าง FormData เพื่อส่งข้อมูล
    const formData = new FormData();
    formData.append("name", teamName);
    if (logo) formData.append("logo", logo);

    const response = await fetch("/api/teams", {
      method: "POST",
      body: formData, 
    });

    if (response.ok) {
      alert("✅ เพิ่มทีมสำเร็จ!");
      router.push("/teams/mainTeam");
    } else {
      alert("❌ เกิดข้อผิดพลาด ไม่สามารถเพิ่มทีมได้");
    }
  };

  return (
    <div className="form-container">
      <h1>เพิ่มทีมใหม่</h1>
      <form onSubmit={handleSubmit}>
        {/* ✅ ช่องกรอกชื่อทีม */}
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

        {/* ✅ ช่องอัปโหลดโลโก้ทีม */}
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

        {/* ✅ แสดงตัวอย่างโลโก้ */}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" width="100" />
          </div>
        )}

        {/* ✅ ปุ่มส่งข้อมูล & ยกเลิก */}
        <div className="button-group">
          <button type="submit" className="add-btn">เพิ่มทีม</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">ยกเลิก</button>
        </div>
      </form>
    </div>
  );
}
