import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Exams from "./pages/Exams";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./pages/ManageUsers";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route path="/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
