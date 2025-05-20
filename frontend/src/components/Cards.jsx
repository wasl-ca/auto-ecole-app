import { useAppContext } from "../context/AppContext";

export default function DashboardCards() {
  const { students, exams } = useAppContext();
    const stats = [
      { label: "Total Students", icon: "🎓", value: students.length },
      { label: "Available Exams", icon: "📅", value: exams.length },
      { label: "Recent Registrations", icon: "📝", value: 3 },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white shadow p-4 rounded-xl flex items-center gap-4">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <div className="text-gray-600">{stat.label}</div>
              <div className="text-xl font-semibold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  