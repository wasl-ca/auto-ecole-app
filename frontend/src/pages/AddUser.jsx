import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

export default function AddUserPage() {
  const navigate = useNavigate();
  const { token } = useAppContext();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    cin: "",
    dateOfBirth: "",
    role: "",
  });
  const roles = [
    { value: "admin", label: t("role_admin") },
    { value: "instructor", label: t("role_instructor") },
    { value: "student", label: t("role_student") },
  ];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate("/users");
    setForm({
      fullName: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      cin: "",
      dateOfBirth: "",
      role: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
        const userIdCreated = await api.post("/users", {
            fullName: form.fullName,
            username: form.username,
            password: form.password,
            email: form.email,
            phone: form.phone,
            address: form.address,
            role: form.role,
        }, config);
      if (form.role === "student") {
        await api.post(
          "/students",
          { userId: userIdCreated.data, cin: form.cin, dateOfBirth: form.dateOfBirth },
          config
        );
      }
      navigate("/users");
    } catch (err) {
      setError(
        t("error_add_user_failed", {
          error: err?.response?.data?.message || "",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-2xl rounded-2xl bg-white">
      <h2 className="text-xl font-bold mb-4">{t("add_user")}</h2>
      {error && (
        <div className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="role">{t("role")}</Label>
          <select
            name="role"
            required
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="fullname">{t("full_name")}</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder={t("placeholder_full_name")}
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            placeholder={t("placeholder_email")}
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            placeholder={t("placeholder_phone")}
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="address">{t("address")}</Label>
          <Input
            id="address"
            name="address"
            placeholder={t("placeholder_address")}
            value={form.address}
            onChange={handleChange}
          />
        </div>
        {form.role === "student" && (
          <>
            <div>
              <Label htmlFor="cin">{t("cin")}</Label>
              <Input
                id="cin"
                name="cin"
                placeholder={t("placeholder_cin")}
                value={form.cin}
                maxLength={8}
                pattern="\d{8}"
                onChange={handleChange}
                required={form.role === "student"}
              />
              {form.cin && !/^\d{8}$/.test(form.cin) && (
                <p className="text-red-500 text-sm mt-1">
                  CIN must be exactly 8 digits.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dateOfBirth">{t("date_of_birth")}</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder={t("placeholder_date_of_birth")}
                value={form.dateOfBirth}
                onChange={handleChange}
                required={form.role === "student"}
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="username">{t("username")}</Label>
          <Input
            id="username"
            name="username"
            placeholder={t("placeholder_username")}
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={t("placeholder_password")}
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {t("button_add_user")}
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
