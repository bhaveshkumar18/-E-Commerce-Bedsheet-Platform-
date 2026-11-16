const Footer = () => {
  return (
    <footer className="mt-10 bg-[#131A22] text-slate-200 text-sm">
      <div className="border-t border-slate-700/60">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full bg-[#232F3E] hover:bg-[#2c384a] text-xs font-medium text-slate-100 py-2"
        >
          Back to top
        </button>
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-slate-100 tracking-wide mb-3 uppercase">
              Get to Know Us
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>About</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Our Story</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-100 tracking-wide mb-3 uppercase">
              Help
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>Customer Service</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-100 tracking-wide mb-3 uppercase">
              Policies
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Cookie Policy</li>
              <li>Security</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-100 tracking-wide mb-3 uppercase">
              Contact
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>Support Center</li>
              <li>Live Chat</li>
              <li>Email Us</li>
              <li>+1 (800) 555-0199</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700/60">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} eCommerce. All rights reserved.</p>
            <p>Built with ❤️ using React, Tailwind & Node.js.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

