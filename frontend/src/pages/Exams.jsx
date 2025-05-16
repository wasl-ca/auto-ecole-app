import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Exams() {
  const { students } = useAppContext();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📆 Upcoming Driving Exams</h1>

      {loading ? (
        <p>Loading exam dates...</p>
      ) : exams.length === 0 ? (
        <p>No exams scheduled.</p>
      ) : (
        <div className="space-y-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{exam.type} Exam</h2>
                  <p>Date: {new Date(exam.date).toLocaleDateString()}</p>
                  <p>Location: {exam.location}</p>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {exam.registeredStudents.length} student(s) registered
                  </span>
                </div>
              </div>

              {exam.registeredStudents.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold">Registered students:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {exam.registeredStudents.map((id) => {
                      const student = students.find((s) => s._id === id);
                      return <li key={id}>{student?.name || "Unknown student"}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
