import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });
  const [message, setMessage] = useState("");

  if (!user) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      name: form.name,
      email: form.email
    };
    if (form.password) payload.password = form.password;
    const { data } = await api.put("/users/me", payload);
    setMessage("Profile updated");
    setForm({ ...form, password: "" });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-1">Your Profile</h1>
      <p className="text-xs text-slate-500 mb-4">
        Manage your account information and security.
      </p>
      {message && <div className="mb-2 text-green-600 text-xs">{message}</div>}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white rounded-lg shadow-sm border border-slate-200 px-4 py-4"
      >
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Name
          </label>
          <input
            className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Email
          </label>
          <input
            className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            New password (optional)
          </label>
          <input
            className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF9900] text-black py-2 rounded-md text-sm font-semibold hover:bg-[#f9a825] transition-colors"
        >
          Save changes
        </button>
      </form>
      <button
        onClick={logout}
        className="mt-3 text-xs text-red-600 underline"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
