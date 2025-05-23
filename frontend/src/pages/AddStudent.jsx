// src/pages/AddStudentPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { showError, showSuccess } from "../lib/toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

const AddStudentPage = () => {
  const navigate = useNavigate();
  const { token } = useAppContext();
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
      <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="cin"
          value={form.cin}
          onChange={handleChange}
          placeholder="CIN"
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="examType"
          value={form.examType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="code">Code</option>
          <option value="conduite">Conduite</option>
          <option value="manoeuvre">Manoeuvre</option>
        </select>

        <input
          type="date"
          name="prefferredExamDate"
          value={form.prefferredExamDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
        <button
          type="reset"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
