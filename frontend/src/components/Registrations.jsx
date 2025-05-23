import { useAppContext } from "../context/AppContext";

export default function RecentRegistrations() {
  // list of registred students in exams
  const { exams } = useAppContext();
  
    // Flatten the array of registered students from all exams
    // and map to get the required fields
 const registeredStudents = exams.map((exam) => exam.registeredStudents).flat();
  
    return (
      <div className="mt-8 bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Registrations</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th>Name</th>
              <th>Exam Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {registeredStudents.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No recent registrations
                </td>
              </tr>
            ) : (
              ""
            )}
            {/* Map through the registered students and display their details */}
            {registeredStudents.map((reg, idx) => (
              <tr key={idx} className="border-b">
                <td>{reg.fullName}</td>
                <td>{reg.examType}</td>
                <td>{reg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  