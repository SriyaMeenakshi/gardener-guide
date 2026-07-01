export default function FertilizerGuidePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-emerald-50/50 rounded-xl shadow-md mt-8 border border-emerald-100">
      <img
        src="/guides/fertilizer-hero.jpg"
        alt="Person pouring liquid fertilizer into a watering can"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 tracking-tight">
          🌿 The Ultimate Fertilizer Guide
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          In nature, decaying leaves and organic matter constantly replenish the soil. In pots and home gardens, those nutrients run out quickly! Fertilizer is the "food" your plants need to grow massive leaves, resist disease, and produce brilliant flowers and fruits.
        </p>
      </header>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-emerald-200">
        <h2 className="text-3xl font-bold text-emerald-900 mb-4">🧪 Understanding N-P-K</h2>
        <p className="text-gray-700 mb-4">
          Every fertilizer label has three numbers (like 10-10-10 or 3-1-2). These represent the macronutrients plants need most:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li><strong>(N) Nitrogen:</strong> For <em>Shoots</em>. Promotes lush, green, leafy growth. (Crucial for foliage plants).</li>
          <li><strong>(P) Phosphorus:</strong> For <em>Roots & Fruits</em>. Encourages strong root systems and massive blooms/vegetables.</li>
          <li><strong>(K) Potassium:</strong> For <em>Overall Health</em>. Helps the plant fight off disease and tolerate stress.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-2 inline-block">
          🧴 Types of Fertilizer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Liquid Fertilizer</h3>
            <p className="text-sm text-gray-600">
              Mixed with water and applied during regular watering. Gives the plant an instant, fast-acting boost of nutrients. Best for indoor plants and heavy-feeding vegetables.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-amber-600 mb-2">Slow-Release Granules</h3>
            <p className="text-sm text-gray-600">
              Little beads mixed into the topsoil. They slowly release a tiny amount of fertilizer every time you water. Low maintenance and great for outdoor pots and shrubs.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-700 mb-2">Organic Compost</h3>
            <p className="text-sm text-gray-600">
              Natural matter (like worm castings or aged manure). It gently feeds the plant over time and actually improves the structure and health of the soil itself.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-400 pb-2 inline-block">
          ❌ Common Fertilizer Mistakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
            <img src="/guides/fertilizer-burn.jpg" alt="Plant leaves with crispy burnt edges from excess fertilizer" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">Fertilizer Burn</h3>
              <p className="text-sm text-gray-600 mb-4">More is not better! Too much fertilizer creates toxic salt buildups in the soil that literally burn the plant's roots and leaves.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Signs:</strong> Brown, crispy edges on the leaves; a white, crusty salt layer on the surface of the soil.</li>
                <li><strong>Fix:</strong> "Flush" the soil by running pure water through the pot for several minutes to wash out excess salts.</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
            <img src="/guides/dormant-plant.jpg" alt="A dormant winter houseplant" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">Feeding Dormant Plants</h3>
              <p className="text-sm text-gray-600 mb-4">Plants stop growing during the short, cold days of winter. If you feed them when they aren't actively growing, the fertilizer just sits in the soil and burns the roots.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Rule of Thumb:</strong> Only fertilize during the active growing season (Spring and Summer). Stop entirely in Late Fall and Winter.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-emerald-800 text-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">💡 Pro Fertilizing Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-emerald-300 text-xl mr-3">✓</span>
            <div><strong>Dilute, Dilute, Dilute:</strong> For indoor plants, it is always safer to dilute liquid fertilizer to half or even a quarter of the strength recommended on the bottle. Feed them "weakly, weekly."</div>
          </li>
          <li className="flex items-start">
            <span className="text-emerald-300 text-xl mr-3">✓</span>
            <div><strong>Never Fertilize a Thirsty Plant:</strong> Always water your plant with plain water first, then apply fertilizer. Applying fertilizer to bone-dry roots will cause immediate fertilizer burn.</div>
          </li>
        </ul>
      </section>

      <section className="mb-16 text-center">
        <div className="relative inline-block w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg group">
          <img src="/guides/fertilizer-video-thumbnail.jpg" alt="Video thumbnail for fertilizing house and garden plants" className="w-full h-64 object-cover brightness-75 group-hover:brightness-50 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Watch the Fertilizer Tutorial</h2>
            <a href="https://www.youtube.com/results?search_query=how+to+fertilize+plants" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-full transition-colors flex items-center shadow-lg">
              <span className="text-xl mr-2">▶</span> Play Video
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}