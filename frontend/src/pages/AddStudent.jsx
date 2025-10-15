// src/pages/AddStudentPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { showError, showSuccess } from "../lib/toast";
import { useTranslation } from "react-i18next";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

const AddStudentPage = () => {
  const navigate = useNavigate();
  const { token } = useAppContext();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    cin: "",
    examType: "code",
    prefferredExamDate: "",
    prefferredExamLocation: "",
  });
  const handleCancel = () => {
    navigate("/students");
    setForm({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      cin: "",
      examType: "code",
      prefferredExamDate: "",
      prefferredExamLocation: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      };

      const studentRes = await api.post("/students", config);
      if (studentRes.status === 201) {
        showSuccess("Student added successfully!");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          dateOfBirth: "",
          cin: "",
          examType: "code",
          prefferredExamDate: "",
          prefferredExamLocation: "",
        });
      } else {
        showError("Failed to add student");
      }
    } catch (error) {
      showError("Error adding student: " + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{t("add_student")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">{t("full_name")}</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder={t("name")}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("email")}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("email")}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("phone")}</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("phone")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("address")}</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder={t("address")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("date_of_birth")}</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("cin")}</label>
          <input
            name="cin"
            value={form.cin}
            onChange={handleChange}
            placeholder={t("cin")}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t("exam_type")}</label>
          <select
            name="examType"
            value={form.examType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="code">{t("type_theorique")}</option>
            <option value="conduite">{t("type_pratique")}</option>
            <option value="manoeuvre">{t("type_manoeuvre")}</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">
            {t("preferred_exam_date")}
          </label>
          <input
            type="date"
            name="prefferredExamDate"
            value={form.prefferredExamDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            {t("preferred_exam_location")}
          </label>
          <select
            name="prefferredExamLocation"
            value={form.prefferredExamLocation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Zarzis">Zarzis</option>
            <option value="Jerba">Jerba</option>
            <option value="Ben Guerdane">Ben Guerdane</option>
            <option value="Midoun">Midoun</option>
            <option value="Medenine">Medenine</option>
            <option value="Houmet Souk">Houmet Souk</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {t("button_add_student")}
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
};

export default AddStudentPage;
