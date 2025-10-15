// src/pages/AddLesson.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import InstructorCalendar from "../components/InstructorCalendar";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

export default function AddLessonPage() {
  const { students, instructors } = useAppContext();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    student: "",
    instructor: "",
    type: "code",
    date: "",
    time: "",
    duration: 50,
    price: 0,
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
    try {
      const isBooked = await api.post(
        "/lessons/isBooked",
        {
          instructorId: form.instructor,
          date: form.date,
          time: form.time,
          duration: form.duration,
        },
        config
      );
      console.log(isBooked);
      if (isBooked.data.booked) {
        setError(t("message_lesson_already_booked"));
        return;
      }
      await api.post("/lessons", form, config);
      setSuccess(t("message_lesson_added_success"));
      setTimeout(() => navigate("/lessons"), 1000);
    } catch (err) {
      setError("Erreur lors de l'ajout de la leçon");
    }
  };
  const handleCancel = () => {
    navigate("/lessons");
    setForm({
      student: "",
      instructor: "",
      type: "code",
      date: "",
      time: "",
      price: 0,
      duration: 50,
      location: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-2xl font-semibold mb-4">{t("add_lesson")}</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">{t("lesson_type")}</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="code">{t("type_theorique")}</option>
            <option value="conduite">{t("type_pratique")}</option>
            <option value="manoeuvre">{t("type_manoeuvre")}</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("student")}</label>
          <select
            name="student"
            value={form.student}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">{t("select_student")}</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.userId.fullName}
              </option>
            ))}
          </select>
        </div>
        {form.type !== "code" && (
          <div>
            <label className="block mb-1 font-medium">{t("instructor")}</label>
            <select
              name="instructor"
              value={form.instructor}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">{t("select_instructor")}</option>
              {instructors.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.fullName}
                </option>
              ))}
            </select>
            {form.instructor && (
              <InstructorCalendar instructorId={form.instructor} />
            )}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">{t("date")}</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t("time")}</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            {t("duration")} ({t("minutes")})
          </label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            {t("price")} ({t("currency")})
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1 font-medium">
            {t("location")}
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block mb-1 font-medium">
            {t("notes")}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder={t("placeholder_notes")}
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>
          
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {t("button_add_lesson")}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-red-300 hover:bg-red-400 text-white py-2 rounded mt-2"
        >
          {t("button_cancel")}
        </button>
      </form>
    </div>
  );
}
