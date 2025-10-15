import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { formatLessonType } from "../lib/formatter";
import { useMemo } from "react";
import AlertModal from "../components/AlertModel";

export default function LessonsPage() {
  const { lessons, fetchLessons } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.instructor?.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lesson.student?.userId.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const sortedLessons = useMemo(() => {
    const sorted = [...filteredLessons];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === "date") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredLessons, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

   useEffect(() => {
    fetchLessons();
   }, []);
  
  const updateLesson = async (id) => {
    navigate(`/lessons/update/${id}`);
  };

  const deleteLesson = async (id) => {
    if (!window.confirm(t("confirm_delete", {item: t("lesson")}))) return;
    try {
      await axios.delete(`/api/lessons/${id}`);
    } catch (err) {
      console.error("Failed to delete lesson", err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t("lessons")}</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={() => navigate("/lessons/add")}
        >
          {t("add_lesson")}
        </button>
      </div>
      <SearchBar
        placeholder={t("placeholder_search_lessons")}
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          deleteLesson(lesson._id);
          setShowAlert(false);
        }}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="px-4 py-2 border-b"
                onClick={() => handleSort("type")}
              >
                {t("type")}
              </th>
              <th
                className="px-4 py-2 border-b"
                onClick={() => handleSort("date")}
              >
                {t("date")}
              </th>
              <th className="px-4 py-2 border-b">{t("duration")}</th>
              <th className="px-4 py-2 border-b">{t("instructor")}</th>
              <th className="px-4 py-2 border-b">{t("student")}</th>
              <th className="px-4 py-2 border-b">{t("location")}</th>
              <th className="px-4 py-2 border-b">{t("price")}</th>
              <th className="px-4 py-2 border-b">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedLessons.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  {t("lessons_empty")}
                </td>
              </tr>
            )}
            {sortedLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td className="px-4 py-2 border-b">
                  {formatLessonType(lesson.type)}
                </td>
                <td className="px-4 py-2 border-b">
                  {new Date(lesson.date).toDateString()}
                  {lesson.time ? ` ${lesson.time}` : ""}
                </td>
                <td className="px-4 py-2 border-b">{lesson.duration} mins</td>
                <td className="px-4 py-2 border-b">
                  {lesson.instructor?.fullName || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {lesson.student?.userId.fullName || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{lesson.location}</td>
                <td className="px-4 py-2 border-b">
                  {lesson.price ? `${lesson.price} ${t("currency")}` : "Free"}
                </td>
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    onClick={() => navigate(`/students/edit/${student._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                  >
                    {t("button_edit")}
                  </button>
                  <button
                    onClick={() => setShowAlert(true)}
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
    </div>
  );
}
