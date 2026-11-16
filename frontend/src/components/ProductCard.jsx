import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const getMockRating = (id) => {
  // Simple deterministic pseudo-rating based on id length
  const base = (id?.length || 10) % 5;
  return 3.5 + (base / 10);
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const rating = getMockRating(product._id);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const originalPrice = (product.price * 1.25).toFixed(2);
  const discountPercent = 20;
  const isPrimeLike = true;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to add to cart");
      return;
    }
    await addToCart(product._id, 1);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative bg-white rounded-2xl shadow-sm card-hover flex flex-col overflow-hidden border border-slate-100"
    >
      {/* Discount badge */}
      <div className="absolute top-2 left-2 z-10 rounded-full bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 shadow">
        -{discountPercent}%
      </div>

      {/* Quick view overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/10 group-hover:opacity-100">
        <span className="pointer-events-auto inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
          Quick View
        </span>
      </div>

      {/* Image */}
      <div className="bg-slate-50 flex items-center justify-center h-44 md:h-48 overflow-hidden">
        <img
          src={`http://localhost:5000${product.imageUrl}`}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-3.5 pt-3 pb-3">
        <h3 className="text-sm font-medium text-slate-900 line-clamp-2 mb-1.5">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-2">
          {product.description}
        </p>

        {/* Rating + prime-like badge */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-[#FF9900] text-xs">
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            {hasHalf && <span>☆</span>}
          </div>
          <span className="text-[11px] text-slate-500">
            {rating.toFixed(1)} • Best Seller
          </span>
          {isPrimeLike && (
            <span className="ml-1 inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
              Prime
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-slate-500 line-through">
              ${originalPrice}
            </span>
            <span className="text-lg font-semibold text-[#B12704]">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-[11px] text-green-600 mt-0.5">
            Save ${(originalPrice - product.price).toFixed(2)} with today&apos;s
            deal
          </p>
        </div>

        {/* Category + delivery */}
        <div className="text-[11px] text-slate-500 mb-3 space-y-0.5">
          <p>
            In <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-[10px] text-emerald-700">
            ✓ Free delivery on orders over $50
          </p>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-[#FF9900] px-4 py-1.5 text-xs font-semibold text-black shadow-sm hover:bg-[#f9a825] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

