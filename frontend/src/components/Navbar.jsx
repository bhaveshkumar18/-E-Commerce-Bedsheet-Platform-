import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Footwear",
  "Accessories",
  "Home & Kitchen",
  "Beauty",
  "Sports"
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [badgeAnimate, setBadgeAnimate] = useState(false);

  const cartCount = useMemo(
    () => cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
    [cart.items]
  );

  // Trigger badge animation when cart count changes
  useEffect(() => {
    if (!cartCount) return;
    setBadgeAnimate(true);
    const timer = setTimeout(() => setBadgeAnimate(false), 400);
    return () => clearTimeout(timer);
  }, [cartCount]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleCategoryClick = (cat) => {
    const value = cat === "All" ? "" : cat;
    navigate(`/?category=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Primary header */}
      <nav className="bg-[#131921] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1 focus:outline-none"
          >
            <span className="bg-[#FF9900] text-black font-black text-xl px-2 py-1 rounded-sm">
              e
            </span>
            <span className="font-semibold text-lg tracking-tight">
              Commerce
            </span>
          </button>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 items-stretch"
          >
            <div className="flex flex-1 rounded-md overflow-hidden bg-white">
              <input
                type="text"
                className="flex-1 px-3 py-2 text-sm text-slate-900 outline-none"
                placeholder="Search for products, brands and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 bg-[#FF9900] text-black text-sm font-semibold hover:bg-[#f9a825]"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-4 text-xs md:text-sm">
            {user ? (
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-slate-300 text-[11px]">
                  Hello, {user.name.split(" ")[0]}
                </span>
                <NavLink
                  to="/profile"
                  className="font-semibold hover:text-[#FF9900]"
                >
                  Account & Profile
                </NavLink>
              </div>
            ) : (
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-slate-300 text-[11px]">
                  Hello, Guest
                </span>
                <div className="flex gap-2">
                  <NavLink
                    to="/login"
                    className="hover:text-[#FF9900] font-semibold"
                  >
                    Login
                  </NavLink>
                  <span className="text-slate-500">|</span>
                  <NavLink
                    to="/register"
                    className="hover:text-[#FF9900] font-semibold"
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            )}

            {user && (
              <NavLink
                to="/orders"
                className="hidden md:flex flex-col leading-tight"
              >
                <span className="text-slate-300 text-[11px]">
                  Returns
                </span>
                <span className="font-semibold hover:text-[#FF9900]">
                  & Orders
                </span>
              </NavLink>
            )}

            {user && user.role === "admin" && (
              <NavLink
                to="/admin"
                className="hidden md:flex flex-col leading-tight"
              >
                <span className="text-slate-300 text-[11px]">
                  Admin
                </span>
                <span className="font-semibold hover:text-[#FF9900]">
                  Dashboard
                </span>
              </NavLink>
            )}

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center gap-1 hover:text-[#FF9900]"
            >
              <div className="relative">
                <span className="material-icons-outlined text-2xl hidden sm:inline-block">
                  shopping_cart
                </span>
                <span className="sm:hidden text-sm font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 rounded-full bg-[#FF9900] text-black text-[10px] font-bold px-1.5 ${
                      badgeAnimate ? "cart-badge-animate" : ""
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>

            {user && (
              <button
                onClick={logout}
                className="hidden md:inline text-xs text-slate-300 hover:text-[#FF9900]"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-2">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex rounded-md overflow-hidden bg-white">
              <input
                type="text"
                className="flex-1 px-3 py-2 text-sm text-slate-900 outline-none"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 bg-[#FF9900] text-black text-xs font-semibold"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </nav>

      {/* Secondary category bar */}
      <div className="bg-[#232F3E] text-slate-100 text-xs md:text-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="whitespace-nowrap px-2 py-1 rounded-sm hover:bg-slate-700/60 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
