import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { user, logout} = useAppContext();
  return (
    <nav className="bg-white shadow flex justify-between px-6 py-4 items-center">
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className="text-blue-600">🚗 </span> Auto Ecole
      </div>
      {user && (
        <>
          <div className="flex gap-6 text-gray-600">
            <Link to="/">Dashboard</Link>
            <Link to="/students">Students</Link>
            <Link to="/exams">Exams</Link>
            {user.role === "admin" && (
              <Link to="/admin/users">Manage Users</Link>
            )}
          </div>
          <span className="text-sm">
            Welcome, {user.fullName || user.username}
          </span>
          <button onClick={logout} className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
