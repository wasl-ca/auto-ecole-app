import { useAppContext } from "../context/AppContext";

export default function Students() {
  const { students, isLoading, registerStudentToExam } = useAppContext();

  const handleRegister = async (studentId) => {
    try {
      const result = await registerStudentToExam(studentId, "driving");
      alert(`Student registered! ✅`);
    } catch (err) {
      alert("❌ Registration failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Student List</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-xl p-4 border"
            >
              <h2 className="text-lg font-semibold">{student.name}</h2>
              <p>Email: {student.email}</p>
              <p>Status: {student.examRegistered ? "✅ Registered" : "❌ Not registered"}</p>

              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={student.examRegistered}
                onClick={() => handleRegister(student._id)}
              >
                {student.examRegistered ? "Already Registered" : "Register to Exam"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
