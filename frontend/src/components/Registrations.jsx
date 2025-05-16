export default function RecentRegistrations() {
    const registrations = [
      { name: "Sarah M.", type: "Code", date: "2025-06-03" },
      { name: "Omar B.", type: "Conduite", date: "2025-06-05" },
      { name: "Lina T.", type: "Code", date: "2025-06-06" },
    ];
  
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
            {registrations.map((reg, idx) => (
              <tr key={idx} className="border-b">
                <td>{reg.name}</td>
                <td>{reg.type}</td>
                <td>{reg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  