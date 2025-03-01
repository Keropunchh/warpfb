import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLeague() {
  const [leagueName, setLeagueName] = useState("");
  const [logo, setLogo] = useState(null);
  const router = useRouter();
  const [preview, setPreview] = useState("");

  const handleCancel = () => {
    router.push("/leagues/mainLeagues"); // เปลี่ยนเส้นทางไปยังหน้าหลักของลีก
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", leagueName);
    if (logo) formData.append("logo", logo);

    const response = await fetch("/api/leagues", {
      method: "POST",
      body: formData, // ส่งข้อมูลแบบ FormData
    });

    if (response.ok) {
      router.push("/leagues/mainLeagues");
    } else {
      console.error("Error adding league");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">เพิ่มลีกใหม่</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-md">
        {/* ชื่อลีก */}
        <div className="form-group mb-4">
          <label className="block font-bold">ชื่อลีก</label>
          <input
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            placeholder="ชื่อลีก"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* เลือกรูปลีก */}
        <div className="form-group mb-4">
          <label className="block font-bold">โลโก้ลีก</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setLogo(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0])); // แสดงโลโก้ที่อัปโหลด
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* แสดงตัวอย่างโลโก้ */}
        {preview && (
          <div className="image-preview mb-4">
            <img src={preview} alt="Preview" width="100" />
          </div>
        )}

        {/* ปุ่มส่งข้อมูล */}
        <div className="form-group flex gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            เพิ่มลีก
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
