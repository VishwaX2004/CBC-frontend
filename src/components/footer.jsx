export default function Footer() {
  return (
    <footer className="bg-[var(--color-accent)] text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold">Glow & Shine Cosmetics</h2>
          <p className="text-sm text-white/80 mt-1">
            Premium skincare & beauty products.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a
            href="#products"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            Products
          </a>
          <a
            href="#about"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a
            href="#"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>

      <div className="text-center text-white/60 text-sm py-4 border-t border-white/20">
        © {new Date().getFullYear()} Glow & Shine Cosmetics. All rights reserved.
      </div>
    </footer>
  );
}
