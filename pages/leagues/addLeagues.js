import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddLeague() {
  const [leagueName, setLeagueName] = useState("");
  const [logo, setLogo] = useState(null);
  const [existingLeagues, setExistingLeagues] = useState([]); // เก็บลีกที่มีอยู่แล้ว
  const router = useRouter();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    // ดึงข้อมูลลีกที่มีอยู่แล้วจาก API
    fetch("/api/leagues")
      .then((response) => response.json())
      .then((data) => setExistingLeagues(data))
      .catch((error) => console.error("Error fetching leagues:", error));
  }, []);

  // ✅ ฟังก์ชันตรวจสอบอักขระพิเศษ
  const validateLeagueName = (name) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; // ตรวจอักขระพิเศษ
    return !specialCharRegex.test(name);
  };

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการเพิ่มลีกหรือไม่?")) {
      router.push("/leagues/mainLeagues");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบว่าไม่ปล่อยว่าง
    if (!leagueName.trim()) {
      alert("❌ กรุณากรอกชื่อลีก");
      return;
    }

    // ✅ ตรวจสอบอักขระพิเศษ
    if (!validateLeagueName(leagueName)) {
      alert("❌ ชื่อลีกห้ามมีอักขระพิเศษ เช่น !@#$%^&*()");
      return;
    }

    // ✅ ตรวจสอบว่าชื่อลีกซ้ำหรือไม่
    const isDuplicate = existingLeagues.some(
      (league) => league.name.toLowerCase() === leagueName.toLowerCase()
    );

    if (isDuplicate) {
      alert("❌ ชื่อลีกนี้มีอยู่แล้ว กรุณากรอกชื่อใหม่");
      return;
    }

    // ✅ สร้าง FormData เพื่อส่งข้อมูล
    const formData = new FormData();
    formData.append("name", leagueName);
    if (logo) formData.append("logo", logo);

    const response = await fetch("/api/leagues", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("✅ เพิ่มลีกสำเร็จ!");
      router.push("/leagues/mainLeagues");
    } else {
      alert("❌ เกิดข้อผิดพลาด ไม่สามารถเพิ่มลีกได้");
    }
  };

  return (
    <div className="form-container">
      <h1>เพิ่มลีกใหม่</h1>
      <form onSubmit={handleSubmit}>
        {/* ✅ แสดงช่องกรอกชื่อลีก */}
        <div className="form-group">
          <label>ชื่อลีก</label>
          <input
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            placeholder="ชื่อลีก"
            required
          />
        </div>

        {/* ✅ ช่องอัปโหลดโลโก้ */}
        <div className="form-group">
          <label>โลโก้ลีก</label>
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

        {/* ✅ ปุ่มเพิ่มลีก & ยกเลิก */}
        <div className="button-group">
          <button type="submit" className="add-btn">เพิ่มลีก</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">ยกเลิก</button>
        </div>
      </form>
    </div>
  );
}
