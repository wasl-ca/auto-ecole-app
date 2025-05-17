import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError("You are not authorized to view users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    try {
      await axios.put(
        `/api/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border space-x-2">
                {u.role === "user" ? (
                  <button
                    onClick={() => changeRole(u._id, "admin")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Promote to Admin
                  </button>
                ) : (
                  <button
                    onClick={() => changeRole(u._id, "user")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Demote to User
                  </button>
                )}
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
