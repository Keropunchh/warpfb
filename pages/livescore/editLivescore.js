import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditLivescore() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [existingScores, setExistingScores] = useState([]); // ✅ เก็บข้อมูล Livescore ทั้งหมด

  useEffect(() => {
    if (id) {
      // ✅ ดึงข้อมูล Livescore ตาม ID เพื่อนำมาแก้ไข
      fetch(`/api/livescore/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name || ""); // ป้องกัน undefined
          setLink(data.link || ""); // ป้องกัน undefined
        })
        .catch((error) => console.error("Error fetching livescore:", error));

      // ✅ ดึงข้อมูลทั้งหมดเพื่อตรวจสอบการซ้ำกัน
      fetch("/api/livescore")
        .then((response) => response.json())
        .then((data) => setExistingScores(data || []))
        .catch((error) =>
          console.error("Error fetching all livescores:", error)
        );
    }
  }, [id]);

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการแก้ไขสกอร์สดหรือไม่?")) {
      router.push("/livescore/mainLivescore"); // ✅ กลับไปที่หน้าหลัก
    }
  };

  // ✅ ฟังก์ชันตรวจสอบอักขระพิเศษ
  const validateName = (text) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; // อักขระพิเศษที่ห้ามใช้
    return !specialCharRegex.test(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบว่าไม่ได้ปล่อยให้ชื่อว่างเปล่า
    if (!name.trim()) {
      alert("กรุณากรอกชื่อ Livescore");
      return;
    }

    // ✅ ตรวจสอบอักขระพิเศษ
    if (!validateName(name)) {
      alert("ชื่อ Livescore ห้ามมีอักขระพิเศษ เช่น !@#$%^&*()");
      return;
    }

    // ✅ ตรวจสอบว่าชื่อซ้ำหรือไม่ (ยกเว้นตัวเอง)
    const isDuplicate = existingScores?.some(
      (score) =>
        score?.id !== id &&
        (score?.name?.trim().toLowerCase() || "") === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("ชื่อ Livescore นี้มีอยู่แล้ว กรุณากรอกชื่อใหม่");
      return;
    }

    // ✅ ถ้าผ่านการตรวจสอบทั้งหมด ให้ทำการอัปเดต
    const response = await fetch(`/api/livescore/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });

    if (response.ok) {
      alert("บันทึกข้อมูลสำเร็จ!");
      router.push("/livescore/mainLivescore");
    } else {
      alert("เกิดข้อผิดพลาด ไม่สามารถอัปเดต Livescore ได้");
    }
  };

  return (
    <div className="form-container">
      <h1>แก้ไข Livescore</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อ Livescore</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อ Livescore"
            required
          />
        </div>

        <div className="form-group">
          <label>ลิงก์ Livescore</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ลิงก์ Livescore"
            required
          />
        </div>

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
