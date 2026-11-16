const Hero = () => {
  return (
    <section className="animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 mt-3 md:mt-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#151B2A] via-[#1F2937] to-[#FF9900] text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),transparent_55%)]" />
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 md:px-10 md:py-10">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 mb-3 border border-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="uppercase tracking-[0.25em] text-[10px] text-amber-100">
                  Today&apos;s Top Picks
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
                Big Deals Today on Your Favorite Products
              </h1>
              <p className="text-sm md:text-base text-slate-100/90 mb-5">
                Save up to <span className="font-semibold">40%</span> on
                electronics, fashion, home essentials and more. Limited-time
                offers curated just for you.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF9900] px-5 py-2.5 text-sm font-semibold text-black shadow-md hover:bg-[#f9a825] transition-colors"
                >
                  Shop Now
                  <span className="text-lg" aria-hidden="true">
                    →
                  </span>
                </a>
                <div className="hidden md:flex flex-col text-[11px] text-amber-100">
                  <span className="font-semibold">Free delivery</span>
                  <span>on orders above $50 today.</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="rounded-lg bg-white/5 backdrop-blur-sm px-3 py-3 border border-white/10">
                <p className="font-semibold mb-1">Lightning Deals</p>
                <p className="text-slate-100/80">
                  Handpicked offers refreshed every few hours. Grab them before
                  they&apos;re gone.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 backdrop-blur-sm px-3 py-3 border border-white/10">
                <p className="font-semibold mb-1">Premium Brands</p>
                <p className="text-slate-100/80">
                  Discover bestsellers from top brands with guaranteed quality.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 backdrop-blur-sm px-3 py-3 border border-white/10">
                <p className="font-semibold mb-1">Fast Delivery</p>
                <p className="text-slate-100/80">
                  Priority shipping options on thousands of eligible products.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 backdrop-blur-sm px-3 py-3 border border-white/10">
                <p className="font-semibold mb-1">Easy Returns</p>
                <p className="text-slate-100/80">
                  Hassle-free returns on most items within 7 days of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

