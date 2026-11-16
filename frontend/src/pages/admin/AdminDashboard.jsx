import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-slate-200 text-sm"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-slate-200 text-sm"
        >
          Manage Orders
        </Link>
        <Link
          to="/admin/users"
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-slate-200 text-sm"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
