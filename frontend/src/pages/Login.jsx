import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../lib/toast";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error
    setLoading(true);
    try {
      const user = await login(username, password);
      setError(""); // clear any previous error
      if (!user) {
        setError(t("error_login_failed_0"));
        return;
      }
      // Assuming login returns user data
      showSuccess(t("message_login_success"));
      navigate("/"); // redirect to dashboard
    } catch (err) {
      setError(t("error_login_failed_1", { error: err.message }));
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            🔐 {t("login")}
          </h1>

          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold">
              {t("username")}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold">
              {t("password")}
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {t("sign_in")}
          </button>
        </form>
      )}
    </div>
  );
}
