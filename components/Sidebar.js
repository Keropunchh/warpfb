import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => router.push("/")}>หน้าหลัก</button>
          </li>
          <li>
            <button onClick={() => router.push("/leagues/mainLeagues")}>ลีค</button>
          </li>
          <li>
            <button onClick={() => router.push("/teams/mainTeam")}>ทีม</button>
          </li>
          <li>
            <button onClick={() => router.push("/livestreams/mainLivestream")}>ช่องไลฟ์</button>
          </li>
          <li>
            <button onClick={() => router.push("/livescore/mainLivescore")}>สกอร์สด</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
