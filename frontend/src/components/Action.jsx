
import { useNavigate } from "react-router-dom";
export default function QuickActions() {
  const navigate = useNavigate();
    return (
      <div className="mt-6 flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl" onClick={() => navigate("/students")}>
          + Add Student
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
          onClick={() => navigate("/exams")}
        >
          📅 View Exams
        </button>
      </div>
    );
  }
  