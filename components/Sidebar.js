export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>My Dashboard</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => router.push("/")}>หน้าหลัก</button>
          </li>
          <li>
            <button onClick={() => router.push("/")}>ลีค</button>
          </li>
          <li>
            <button onClick={() => router.push("/")}>ทีม</button>
          </li>
          <li>
            <button onClick={() => router.push("/")}>ช่องไลฟ์</button>
          </li>
          <li>
            <button onClick={() => router.push("/")}>สกอร์สด</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
