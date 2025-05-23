import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  const fetchStudents = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const studentRes = await api.get("/students", config);

      setStudents(studentRes.data);
    } catch (err) {
      console.error("Failed to load students", err);
      logout(); // optional: auto logout if token is invalid
    } finally {
      setLoading(false);
    }
  };

  const fetchExams = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const examRes = await api.get("/exams", config);

      setExams(examRes.data);
    } catch (err) {
      console.error("Failed to load exams", err);
      logout(); // optional: auto logout if token is invalid
    } finally {
      setLoading(false);
    }
  }

  const fetchMenu = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        body: { username },
      };
      const menuRes = await api.get("/auth/menu", config);
      setMenu(menuRes.data.menu);
    } catch (err) {
      console.error("Failed to load menu", err);
      logout(); // optional: auto logout if token is invalid
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudents();
      fetchExams();
      fetchMenu(username);
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => { 
    setUsername(username);
    const res = await api.post("/auth/login", { username, password });
    if (res.status !== 200) {
      throw new Error("Login failed");
    }
  
    const data = await res.data;
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    const config = { headers: { Authorization: `Bearer ${data.token}` }, body  : { username } };
    const userRes = await api.get("/auth/me", config);
    setUser(userRes.data);
    return data;
  };



  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setStudents([]);
    setMenu([]);
  };

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        students,
        loading,
        exams,
        menu,
        login,
        logout, 
        fetchStudents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};