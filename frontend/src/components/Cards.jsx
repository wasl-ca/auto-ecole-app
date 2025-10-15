import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DashboardCards() {
  const { students, exams } = useAppContext();
  const { t } = useTranslation();
    const stats = [
      {
        label: t("total_students"),
        icon: "🎓",
        value: students.length,
        path: "/students",
      },
      {
        label: t("available_exams"),
        icon: "📅",
        value: exams.length,
        path: "/exams",
      },
      {
        label: t("recent_registrations"),
        icon: "📝",
        // total registred students in all available exams
        value: exams.reduce((acc, exam) => {
          return acc + exam.registeredStudents.length;
        }, 0),
        path: "/students",
      },
    ];
  const navigate = useNavigate();
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {stats.map((stat) => (
          <button
            onClick={() => navigate(stat.path)}
            key={stat.label}
            className="bg-white shadow p-4 rounded-xl flex items-center gap-4"
          >
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <div className="text-gray-600">{stat.label}</div>
              <div className="text-xl font-semibold">{stat.value}</div>
            </div>
          </button>
        ))}
      </div>
    );
  }
  