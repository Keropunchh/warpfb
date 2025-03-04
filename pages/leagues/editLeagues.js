import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditLeague() {
  const router = useRouter();
  const { id } = router.query;
  const [leagueName, setLeagueName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [existingLeagues, setExistingLeagues] = useState([]); // เก็บลีกที่มีอยู่แล้ว

  useEffect(() => {
    if (id) {
      // ✅ ดึงข้อมูลลีกที่ต้องการแก้ไข
      fetch(`/api/leagues/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setLeagueName(data.name);
          setPreview(data.logo ? data.logo : "");
        })
        .catch((error) => console.error("Error fetching league:", error));
    }

    // ✅ ดึงข้อมูลลีกทั้งหมดเพื่อตรวจสอบชื่อซ้ำ
    fetch("/api/leagues")
      .then((response) => response.json())
      .then((data) => setExistingLeagues(data))
      .catch((error) => console.error("Error fetching leagues:", error));
  }, [id]);

  // ✅ ฟังก์ชันตรวจสอบอักขระพิเศษ
  const validateLeagueName = (name) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; 
    return !specialCharRegex.test(name);
  };

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการแก้ไขลีกหรือไม่?")) {
      router.push("/leagues/mainLeagues");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบว่าชื่อว่างหรือไม่
    if (!leagueName.trim()) {
      alert("❌ กรุณากรอกชื่อลีก");
      return;
    }

    // ✅ ตรวจสอบอักขระพิเศษ
    if (!validateLeagueName(leagueName)) {
      alert("❌ ชื่อลีกห้ามมีอักขระพิเศษ เช่น !@#$%^&*()");
      return;
    }

    // ✅ ตรวจสอบว่าชื่อลีกซ้ำกับลีกอื่นที่ไม่ใช่ลีกนี้หรือไม่
    const isDuplicate = existingLeagues.some(
      (league) => league.name.toLowerCase() === leagueName.toLowerCase() && league.id !== id
    );

    if (isDuplicate) {
      alert("❌ ชื่อลีกนี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น");
      return;
    }

    // ✅ สร้าง FormData เพื่ออัปเดตข้อมูล
    const formData = new FormData();
    formData.append("name", leagueName);
    if (logo) formData.append("logo", logo);

    const response = await fetch(`/api/leagues/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("✅ บันทึกข้อมูลลีกสำเร็จ!");
      router.push("/leagues/mainLeagues");
    } else {
      alert("❌ เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <div className="form-container">
      <h1>แก้ไขลีก</h1>
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

        {/* ✅ ปุ่มบันทึก & ยกเลิก */}
        <div className="button-group">
          <button type="submit" className="save-btn">บันทึก</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">ยกเลิก</button>
        </div>
      </form>
    </div>
  );
}
