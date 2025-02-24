import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditTeam() {
  const router = useRouter();
  const { id } = router.query;
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/teams/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTeamName(data.name);
          setPreview(data.logo ? data.logo : ""); // แสดงรูปเก่าถ้ามี
        })
        .catch((error) => console.error("Error fetching team:", error));
    }
  }, [id]);

  const handleCancel = () => {
    router.push("/teams/mainTeam"); // เปลี่ยนเส้นทางไปยังหน้า teams
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamName);
    if (logo) formData.append("logo", logo);

    const response = await fetch(`/api/teams/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      router.push("/teams/mainTeam");
    } else {
      console.error("Error updating team");
    }
  };

  return (
    <div>
      <h1>แก้ข้อมูลทีม</h1>
      <form onSubmit={handleSubmit}>
        {/* ช่องกรอกชื่อทีม */}
        <div className="form-group">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="ชื่อทีม"
            required
          />
        </div>

        {/* ช่องเลือกรูปโลโก้ */}
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
