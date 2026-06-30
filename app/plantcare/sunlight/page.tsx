import Navbar from "@/components/Navbar";
export default function SunlightGuidePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-amber-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/guides/sunlight-hero.jpg"
        alt="Sunlight streaming through a window onto indoor plants"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-600 tracking-tight">
          ☀️ The Ultimate Sunlight Guide
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Sunlight is the literal fuel that powers your garden. While watering keeps plants hydrated, light provides the energy they need to grow, produce leaves, and bloom. Understanding the difference between direct, indirect, and low light is the key to a thriving indoor or outdoor garden.
        </p>
      </header>

      {/* Why Sunlight is Important */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-amber-200">
        <h2 className="text-3xl font-bold text-amber-800 mb-4">🌱 Why Proper Light is Crucial</h2>
        <p className="text-gray-700">
          Through a process called <strong>photosynthesis</strong>, plants use sunlight to convert water and carbon dioxide into sugars (their food). Without adequate light, this process halts. A plant in the wrong light will either starve slowly or suffer from severe cellular damage from overexposure.
        </p>
      </section>

      {/* Understanding Light Levels */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-400 pb-2 inline-block">
          💡 Understanding Light Levels
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-orange-500 mb-2">Direct Sunlight</h3>
            <p className="text-sm text-gray-600 mb-3">
              Unobstructed rays of the sun hitting the plant directly for 6+ hours a day. 
            </p>
            <p className="text-sm font-semibold text-gray-800">Best for:</p>
            <p className="text-sm text-gray-600">Tomatoes, Chillies, Marigolds, Cacti, and Succulents.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-amber-500 mb-2">Bright Indirect Light</h3>
            <p className="text-sm text-gray-600 mb-3">
              Bright light that is filtered (like through a sheer curtain) or right next to a sunny window without the sun's rays directly touching the leaves.
            </p>
            <p className="text-sm font-semibold text-gray-800">Best for:</p>
            <p className="text-sm text-gray-600">Monstera, Pothos, Calatheas, and most tropical houseplants.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">Low Light</h3>
            <p className="text-sm text-gray-600 mb-3">
              Rooms with north-facing windows or spaces far away from a light source. No plant thrives in the dark, but some tolerate heavy shade.
            </p>
            <p className="text-sm font-semibold text-gray-800">Best for:</p>
            <p className="text-sm text-gray-600">Snake Plants, ZZ Plants, and Cast Iron Plants.</p>
          </div>
        </div>
      </section>

      {/* Common Mistakes (With Images) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-400 pb-2 inline-block">
          ❌ Common Lighting Mistakes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Sunburn Image Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
            <img src="/guides/sunburn-plant.jpg" alt="Plant leaves with crispy white and brown scorched spots" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">Sunburn (Too Much Light)</h3>
              <p className="text-sm text-gray-600 mb-4">Just like human skin, plant leaves can burn if moved abruptly into direct sun or left baking behind hot glass.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Signs:</strong> Bleached white, yellow, or crispy brown patches strictly on the top leaves facing the light.</li>
                <li><strong>Fix:</strong> Prune the dead leaves, move the plant back a few feet, or add a sheer curtain to diffuse the light.</li>
              </ul>
            </div>
          </div>

          {/* Leggy Growth Image Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100">
            <img src="/guides/leggy-plant.jpg" alt="A stretched out, pale plant reaching for a window" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">Etiolation (Not Enough Light)</h3>
              <p className="text-sm text-gray-600 mb-4">When a plant starves for light, it will desperately stretch itself out trying to find the sun.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Signs:</strong> "Leggy" growth (long stems with huge gaps between leaves), pale color, leaning heavily to one side.</li>
                <li><strong>Fix:</strong> Gradually move the plant closer to a window or supplement with an LED grow light.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="mb-12 bg-amber-600 text-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">💡 Pro Sunlight Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-amber-200 text-xl mr-3">✓</span>
            <div><strong>Rotate Your Pots:</strong> Plants grow towards the light. Give your indoor pots a quarter-turn every time you water them so they grow straight and bushy instead of leaning.</div>
          </li>
          <li className="flex items-start">
            <span className="text-amber-200 text-xl mr-3">✓</span>
            <div><strong>Dust the Leaves:</strong> A layer of dust acts like sunscreen, blocking light from entering the leaf. Wipe indoor plant leaves with a damp cloth monthly to maximize photosynthesis.</div>
          </li>
          <li className="flex items-start">
            <span className="text-amber-200 text-xl mr-3">✓</span>
            <div><strong>Beware the Winter Shift:</strong> The sun's angle changes in winter, and the light is much weaker. You may need to move your plants directly to the windowsill during the colder months.</div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="mb-16 text-center">
        <div className="relative inline-block w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg group">
          <img src="/guides/sunlight.jpg" alt="Video thumbnail for understanding plant light requirements" className="w-full h-64 object-cover brightness-75 group-hover:brightness-50 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Watch the Light Tutorial</h2>
            <a href="https://youtu.be/Plketh1TS6M?si=nTE7ECVSUf9Z6UHz" target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-full transition-colors flex items-center shadow-lg">
              <span className="text-xl mr-2">▶</span> Play Video
            </a>
          </div>
        </div>
      </section>

      {/* Related Articles Footer */}
      <section className="border-t border-amber-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🌿 Related Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/plantcare/watering" className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-400 transition-all text-center group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">💧</span>
            <h3 className="font-bold text-gray-800">Watering</h3>
          </a>
          <a href="/plantcare/soil" className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-700 transition-all text-center group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🌱</span>
            <h3 className="font-bold text-gray-800">Soil & Potting</h3>
          </a>
          <a href="/plantcare/fertilizer" className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-green-500 transition-all text-center group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🌿</span>
            <h3 className="font-bold text-gray-800">Fertilizer</h3>
          </a>
        </div>
      </section>
    </main>
  );
}