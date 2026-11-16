import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/client";

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProduct = async () => {
    if (!isEdit) return;
    const { data } = await api.get(`/products/${id}`);
    setForm({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      stock: data.stock
    });
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (image) {
      formData.append("image", image);
    }
    if (isEdit) {
      await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Product updated");
    } else {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Product created");
      navigate("/admin/products");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Product" : "New Product"}
      </h1>
      {message && (
        <div className="mb-2 text-green-600 text-xs">{message}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white rounded-lg shadow-sm border border-slate-200 px-4 py-4"
      >
        <input
          className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          className="border border-slate-300 rounded-md w-full px-3 py-2 text-sm"
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-[#FF9900] text-black py-2 rounded-md text-sm font-semibold hover:bg-[#f9a825] transition-colors"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
