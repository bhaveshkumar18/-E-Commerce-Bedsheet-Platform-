import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
      <p className="text-xs text-slate-500 mb-4">
        Join and unlock fast checkout, order tracking and personalized
        recommendations.
      </p>
      {error && <div className="mb-3 text-red-600 text-xs">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white rounded-lg shadow-sm border border-slate-200 px-4 py-4"
      >
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Full name
          </label>
          <input
            className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Email address
          </label>
          <input
            className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">
            Password
          </label>
          <input
            className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF9900] text-black py-2 rounded-md text-sm font-semibold hover:bg-[#f9a825] transition-colors"
        >
          Create account
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[#FF9900] font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
