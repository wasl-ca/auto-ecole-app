import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function Students() {
  const { students, loading, fetchStudents } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();
  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.userId.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.userId.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cin?.includes(searchTerm)
  );
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Students</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={() => navigate("/students/add")}
        >
          {t("add_student")}
        </button>
      </div>
      <SearchBar
        placeholder={t("placeholder_search_students")}
        value={searchTerm}
        onChange={setSearchTerm}
      />
      {/* Modal */}

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">{t("full_name")}</th>
                <th className="py-2 px-4 border-b">{t("cin")}</th>
                <th className="py-2 px-4 border-b">{t("phone")}</th>
                <th className="py-2 px-4 border-b">{t("exam_type")}</th>
                <th className="py-2 px-4 border-b">{t("status")}</th>
                <th className="py-2 px-4 border-b">
                  {t("preferred_exam_date")}
                </th>
                <th className="py-2 px-4 border-b">
                  {t("preferred_exam_location")}
                </th>
                <th className="py-2 px-4 border-b">
                  {t("registred_?")}
                  </th>
                  <th className="py-2 px-4 border-b">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    {t("students_empty")}
                  </td>
                </tr>
              )}
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{student.userId.fullName}</td>
                  <td className="py-2 px-4 border-b">{student.cin}</td>
                  <td className="py-2 px-4 border-b">{student.userId.phone}</td>
                  <td className="py-2 px-4 border-b capitalize">
                    {student.examType}
                  </td>
                  <td className="py-2 px-4 border-b capitalize">
                    {student.status || "—"}
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
                        ✔ {t("yes")}
                      </span>
                    ) : (
                        <span className="text-red-500 font-semibold">✘ { t("no")}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => navigate(`/students/${student._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      {t("button_view")}
                    </button>
                    <button
                      onClick={() => navigate(`/students/edit/${student._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                    >
                      {t("button_edit")}
                    </button>   
                    <button
                      onClick={() => navigate(`/students/delete/${student._id}`)}
                      className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                    >
                      {t("button_delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
