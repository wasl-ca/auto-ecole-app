import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow flex justify-between px-6 py-4 items-center">
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className="text-blue-600">🛡️</span> Dasrout
      </div>
      <div className="flex gap-6 text-gray-600">
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/exams">Exams</Link>
      </div>
      <button className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">Logout</button>
    </nav>
  );
}
