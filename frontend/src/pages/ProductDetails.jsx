import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }
    await addToCart(product._id, qty);
    alert("Added to cart");
  };

  if (!product)
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 bg-slate-200 rounded-lg animate-pulse" />
          <div className="space-y-3 animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-full" />
            <div className="h-3 bg-slate-200 rounded w-4/5" />
            <div className="h-3 bg-slate-200 rounded w-2/5" />
            <div className="h-8 bg-slate-200 rounded w-1/2 mt-4" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-sm animate-fadeIn">
      <img
        src={`http://localhost:5000${product.imageUrl}`}
        alt={product.name}
        className="w-full md:w-1/2 h-80 object-contain rounded-lg bg-slate-50"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-2 text-slate-900">
          {product.name}
        </h1>
        <p className="text-sm text-slate-600 mb-3">{product.description}</p>
        <p className="font-semibold mb-1">
          Category:{" "}
          <span className="text-slate-700">{product.category}</span>
        </p>
        <p className="mb-2">
          Stock:{" "}
          <span className="font-medium text-slate-800">
            {product.stock > 0 ? product.stock : "Out of stock"}
          </span>
        </p>
        <p className="text-2xl font-bold text-[#B12704] mb-4">
          ${product.price.toFixed(2)}
        </p>
        {product.stock > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <label className="text-sm">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 border border-slate-300 rounded px-2 py-1 text-sm"
            />
          </div>
        )}
        <button
          disabled={product.stock <= 0}
          onClick={handleAdd}
          className="px-5 py-2 bg-[#FF9900] text-black rounded-full text-sm font-semibold disabled:opacity-50 hover:bg-[#f9a825] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
