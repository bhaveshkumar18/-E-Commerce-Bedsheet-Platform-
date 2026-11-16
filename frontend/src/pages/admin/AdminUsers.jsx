import { useEffect, useState } from "react";
import api from "../../api/client";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };

  const updateRole = async (id, role) => {
    await api.put(`/users/${id}/role`, { role });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="space-y-2">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-sm text-slate-900">
                {u.name}
              </p>
              <p className="text-xs text-slate-600">{u.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={u.role}
                onChange={(e) => updateRole(u._id, e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-xs sm:text-sm"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button
                onClick={() => deleteUser(u._id)}
                className="text-xs sm:text-sm text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
