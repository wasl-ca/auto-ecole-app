import { useAppContext } from "../context/AppContext";

const ExamsPage = () => {
  const { exams, loading } = useAppContext();
  const sortedExams = exams.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exam Schedule</h1>

      {loading ? (
        <p>Loading...</p>
      ) : exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Registered Students</th>
            </tr>
          </thead>
          <tbody>
            {sortedExams.map((exam) => (
              <tr key={exam._id}>
                <td className="py-2 px-4 border-b">
                  {new Date(exam.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{exam.time}</td>
                <td className="py-2 px-4 border-b">{exam.location}</td>
                <td className="py-2 px-4 border-b capitalize">
                  {exam.examType}
                </td>
                <td className="py-2 px-4 border-b capitalize">
                  {exam.examStatus}
                </td>
                <td className="py-2 px-4 border-b">
                  {exam.registeredStudents.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamsPage;