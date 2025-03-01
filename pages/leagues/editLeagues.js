import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditLeague() {
  const router = useRouter();
  const { id } = router.query;
  const [leagueName, setLeagueName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/leagues/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setLeagueName(data.name);
          setPreview(data.logo ? data.logo : ""); // แสดงโลโก้เก่าถ้ามี
        })
        .catch((error) => console.error("Error fetching league:", error));
    }
  }, [id]);

  const handleCancel = () => {
    router.push("/leagues/mainLeagues"); // เปลี่ยนเส้นทางไปยังหน้าหลักของลีก
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", leagueName);
    if (logo) formData.append("logo", logo);

    const response = await fetch(`/api/leagues/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      router.push("/leagues/mainLeagues");
    } else {
      console.error("Error updating league");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลลีก</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-md">
        {/* ช่องกรอกชื่อลีก */}
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

        {/* ช่องเลือกรูปโลโก้ */}
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

        {/* ปุ่มบันทึก และปุ่มยกเลิก */}
        <div className="form-group flex gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            บันทึก
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
