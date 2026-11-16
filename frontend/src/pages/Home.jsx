import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/client";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const skeletonArray = Array.from({ length: 9 });

const Home = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const syncFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    const cat = params.get("category") || "";
    setSearch(q);
    setCategory(cat);
  };

  useEffect(() => {
    syncFromQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", {
        params: {
          page,
          search: search || undefined,
          category: category || undefined
        }
      });
      setProducts(data.products);
      setMeta({ page: data.page, pages: data.pages, total: data.total });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div className="animate-fadeIn">
      <Hero />
      <section
        id="products"
        className="max-w-6xl mx-auto px-4 mt-6"
      >
        <div className="rounded-2xl bg-gradient-to-b from-white via-white to-slate-100/70 px-3 sm:px-4 py-4 sm:py-5 shadow-sm border border-slate-100/80">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Recommended for you
              </h2>
              <p className="text-xs text-slate-500">
                Discover top picks curated from thousands of products.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                className="border border-slate-300 rounded-md px-3 py-2 text-sm bg-white w-full sm:w-64"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                className="border border-slate-300 rounded-md px-3 py-2 text-sm bg-white w-full sm:w-40"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skeletonArray.map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm p-3 animate-pulse"
                >
                  <div className="h-40 bg-slate-200 rounded-md mb-3" />
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="bg-white rounded-lg border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
              No products found. Try a different search or category filter.
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={meta.page <= 1}
              onClick={() => fetchProducts(meta.page - 1)}
              className="px-3 py-1.5 border border-slate-300 rounded text-xs bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Prev
            </button>
            <span className="text-xs text-slate-600">
              Page {meta.page} of {meta.pages}
            </span>
            <button
              disabled={meta.page >= meta.pages}
              onClick={() => fetchProducts(meta.page + 1)}
              className="px-3 py-1.5 border border-slate-300 rounded text-xs bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
