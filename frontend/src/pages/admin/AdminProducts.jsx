import { useEffect, useState } from "react";
import api from "../../api/client";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get("/products", { params: { limit: 100 } });
    setProducts(data.products);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          to="/admin/products/new"
          className="px-3 py-1.5 bg-[#FF9900] text-black rounded-md text-xs font-semibold hover:bg-[#f9a825] transition-colors"
        >
          New Product
        </Link>
      </div>
      <div className="space-y-2">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3"
          >
            <img
              src={`http://localhost:5000${p.imageUrl}`}
              alt={p.name}
              className="w-16 h-16 object-contain rounded bg-slate-50"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm text-slate-900">
                {p.name}
              </p>
              <p className="text-xs text-slate-600">
                ${p.price.toFixed(2)} | Stock: {p.stock}
              </p>
            </div>
            <Link
              to={`/admin/products/${p._id}`}
              className="text-xs text-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(p._id)}
              className="text-xs text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
