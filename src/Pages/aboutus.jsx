export function AboutUsPage() {
  return (
    <div className="w-full bg-primary text-text min-h-[calc(100vh-100px)] lg:mt-20 mt-0">

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 mt-15 lg:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          About <span className="text-accent">Crystal Beauty Clear</span>
        </h1>
        <p className="text-base sm:text-lg max-w-3xl mx-auto opacity-80">
          Premium cosmetics crafted to enhance your natural beauty.
        </p>
      </section>

      {/* ================= STORY ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-10 items-center pb-12">

        {/* Text */}
        <div className="space-y-4 sm:space-y-5 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Our Story
          </h2>
          <p className="leading-relaxed opacity-80 text-sm sm:text-base">
            Crystal Beauty Clear Cosmetics was created with a simple vision — to offer
            elegant, skin-friendly, and cruelty-free beauty products that feel
            as good as they look.
          </p>
          <p className="opacity-80 text-sm sm:text-base">
            Every formula is carefully designed to celebrate individuality and
            timeless beauty.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-10 text-center hover:scale-102 transition">
          <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3 sm:mb-4">
            Why Choose Us?
          </h3>
          <ul className="space-y-2 sm:space-y-3 opacity-80 text-sm sm:text-base">
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
