import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AddLivescore() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [existingScores, setExistingScores] = useState([]); // ✅ ประกาศค่าเริ่มต้นของ existingScores
  const router = useRouter();

  useEffect(() => {
    // ✅ ดึงข้อมูล Livescore ทั้งหมดเพื่อตรวจสอบซ้ำ
    fetch("/api/livescore")
      .then((response) => response.json())
      .then((data) => setExistingScores(data || [])) // ✅ กำหนดค่า default เป็น [] ป้องกัน undefined
      .catch((error) => console.error("Error fetching livescores:", error));
  }, []);

  // ✅ ฟังก์ชันตรวจสอบอักขระพิเศษ
  const validateName = (name) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g; // อักขระพิเศษที่ห้ามใช้
    return !specialCharRegex.test(name);
  };

  const handleCancel = () => {
    router.push("/livescore/mainLivescore"); // ✅ กลับไปที่หน้าหลักของ Livescore
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบว่าไม่ได้ปล่อยให้ชื่อว่างเปล่า
    if (!name.trim()) {
      alert("ข้อผิดพลาด! กรุณากรอกชื่อ Livescore");
      return;
    }

    // ✅ ตรวจสอบอักขระพิเศษ
    if (!validateName(name)) {
      alert("ข้อผิดพลาด! ชื่อห้ามมีอักขระพิเศษ เช่น !@#$%^&*()");
      return;
    }

    // ✅ ตรวจสอบว่าชื่อซ้ำหรือไม่
    const isDuplicate = existingScores.some(
      (score) => (score?.name?.trim()?.toLowerCase() || "") === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("ข้อผิดพลาด! ชื่อ Livescore นี้มีอยู่แล้ว กรุณากรอกชื่อใหม่");
      return;
    }

    // ✅ ถ้าผ่านการตรวจสอบทั้งหมด ให้ทำการบันทึก
    const response = await fetch("/api/livescore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });

    if (response.ok) {
      alert("เพิ่ม Livescore สำเร็จ!");
      router.push("/livescore/mainLivescore");
    } else {
      alert("ข้อผิดพลาด! ไม่สามารถเพิ่ม Livescore ได้");
    }
  };

  return (
    <div className="form-container">
      <h1>เพิ่ม Livescore</h1>
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
          <label>ลิงก์</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="ลิงก์ Livescore"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="add-btn">เพิ่ม</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">ยกเลิก</button>
        </div>
      </form>
    </div>
  );
}
