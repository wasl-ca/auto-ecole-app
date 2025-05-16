import { createContext, useContext, useState, useEffect } from "react";

// 1. Create context
const AppContext = createContext();

// 2. Create provider component
export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // current logged in user
  const [students, setStudents] = useState([]); // fetched from backend
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Fetch initial data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const registerStudentToExam = async (studentId, examType) => {
    // Placeholder for exam registration logic
    try {
      const res = await fetch(`/api/exams/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, examType }),
      });
      return await res.json();
    } catch (err) {
      console.error("Registration failed", err);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        students,
        setStudents,
        isLoading,
        registerStudentToExam,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 3. Custom hook for consuming context
export function useAppContext() {
  return useContext(AppContext);
}
