
export function AboutUsPage() {

  return (
    <div className="w-full bg-primary text-text min-h-screen">
      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-10 mt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-accent">Crystal Beauty Clear</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto opacity-80">
          Premium cosmetics crafted to enhance your natural beauty.
        </p>
      </section>

      {/* ================= STORY ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="leading-relaxed opacity-80">
            Glow & Shine Cosmetics was created with a simple vision — to offer
            elegant, skin-friendly, and cruelty-free beauty products that feel
            as good as they look.
          </p>
          <p className="opacity-80">
            Every formula is carefully designed to celebrate individuality and
            timeless beauty.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-accent mb-4">
            Why Choose Us?
          </h3>
          <ul className="space-y-3 opacity-80">
            <li>🌿 Clean & Skin-Friendly</li>
            <li>🐰 Cruelty-Free Beauty</li>
            <li>💎 Premium Quality</li>
            <li>✨ Modern & Elegant Design</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
