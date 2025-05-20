import { useAppContext } from "../context/AppContext";
import AddStudentModal from "../components/AddStudentModal";
import { useEffect, useState } from "react";

export default function Students() {
  const { students, loading, fetchStudents } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Students</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={handleOpenModal}
        >
          + Add Student
        </button>
      </div>
      {/* Modal */}

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">CIN</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Exam Type</th>
                <th className="py-2 px-4 border-b">Preferred Date</th>
                <th className="py-2 px-4 border-b">Preferred Location</th>
                <th className="py-2 px-4 border-b">Registered?</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{student.fullName}</td>
                  <td className="py-2 px-4 border-b">{student.cin}</td>
                  <td className="py-2 px-4 border-b">{student.phone}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {student.examType}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.prefferredExamDate
                      ? new Date(
                          student.prefferredExamDate
                        ).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.prefferredExamLocation || "—"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.examRegistered ? (
                      <span className="text-green-600 font-semibold">
                        ✔ Yes
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">✘ No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <AddStudentModal open={showModal} onClose={handleCloseModal} />
          )}
        </div>
      )}
    </div>
  );
}
