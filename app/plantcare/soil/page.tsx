import Navbar from "@/components/Navbar";
export default function SoilGuidePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-stone-200">
      <Navbar />
      <img
        src="/guides/soil-hero.jpg"
        alt="Hands mixing rich, dark potting soil with perlite"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-stone-800 tracking-tight">
          🌱 The Ultimate Soil & Potting Guide
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Soil is the foundation of your garden. It is not just "dirt"—it is a living, breathing ecosystem that holds water, oxygen, and the nutrients your plants need to survive. Using the right soil mix can mean the difference between a thriving plant and a struggling one.
        </p>
      </header>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-200">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">🪴 Why Soil Quality Matters</h2>
        <p className="text-gray-700">
          Roots need to breathe just as much as they need to drink. Good soil provides a delicate balance of <strong>retention</strong> (holding onto moisture and nutrients) and <strong>drainage</strong> (allowing excess water to escape so roots do not suffocate). 
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-amber-600 pb-2 inline-block">
          🪨 Understanding Soil Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-stone-200 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-700 mb-2">Standard Potting Mix</h3>
            <p className="text-sm text-gray-600 mb-3">
              Lightweight, fluffy, and sterile. Usually made of peat moss or coco coir, perlite, and vermiculite. 
            </p>
            <p className="text-sm font-semibold text-gray-800">Best for:</p>
            <p className="text-sm text-gray-600">Almost all indoor houseplants and container gardens.</p>
          </div>
          <div className="bg-stone-200 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-amber-700 mb-2">Cactus & Succulent Mix</h3>
            <p className="text-sm text-gray-600 mb-3">
              Highly gritty and sandy. Designed to drain water instantly to mimic arid desert environments.
            </p>
            <p className="text-sm font-semibold text-gray-800">Best for:</p>
            <p className="text-sm text-gray-600">Aloe Vera, Snake Plants, Cacti, and Citrus trees.</p>
          </div>
          <div className="bg-stone-200 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-stone-700 mb-2">Garden Soil / Topsoil</h3>
            <p className="text-sm text-gray-600 mb-3">
              Heavy, dense, and rich in natural organic matter and minerals. Retains a lot of moisture.
            </p>
            <p className="text-sm font-semibold text-gray-800">Best for:</p>
            <p className="text-sm text-gray-600">Raised beds, outdoor vegetable gardens, and landscaping.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-400 pb-2 inline-block">
          ❌ Common Soil Mistakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-100 rounded-xl shadow-md overflow-hidden border border-red-100">
            <img src="/guides/compacted-soil.jpg" alt="Hard, cracked, and compacted potting soil" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">Compacted Soil</h3>
              <p className="text-sm text-gray-600 mb-4">Over time, watering pushes the air out of the soil, turning it into a hard brick that chokes roots.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Signs:</strong> Water pools on top and takes a long time to drain; soil pulls away from the edges of the pot.</li>
                <li><strong>Fix:</strong> Gently poke holes in the soil with a chopstick to aerate it, or repot with fresh soil containing more perlite.</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-100 rounded-xl shadow-md overflow-hidden border border-orange-100">
            <img src="/guides/outdoor-soil-indoor.jpg" alt="Muddy outdoor dirt in an indoor plant pot" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">Using Garden Dirt Indoors</h3>
              <p className="text-sm text-gray-600 mb-4">Garden soil is much too heavy for pots. It will turn to mud, cause root rot, and bring outdoor pests inside.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Signs:</strong> Plant yellowing, heavy pots, immediate pest infestations (like fungus gnats).</li>
                <li><strong>Fix:</strong> Never use dirt from the yard in containers. Always buy or mix a dedicated "Potting Mix".</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-stone-800 text-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">💡 Pro Potting Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-amber-400 text-xl mr-3">✓</span>
            <div><strong>Drainage is Non-Negotiable:</strong> Never plant in a pot without a drainage hole. If you love a decorative pot without a hole, keep the plant in a plastic nursery pot and place it inside the decorative one (cachepot method).</div>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 text-xl mr-3">✓</span>
            <div><strong>Don't Pot Up Too Big:</strong> When repotting, only move up to a pot 1-2 inches wider. A massive pot holds too much wet soil, leading to rot.</div>
          </li>
        </ul>
      </section>

      <section className="mb-16 text-center">
        <div className="relative inline-block w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg group">
          <img src="/guides/soil-video-thumbnail.jpg" alt="Video thumbnail for mixing the perfect potting soil" className="w-full h-64 object-cover brightness-75 group-hover:brightness-50 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Mix the Perfect Soil</h2>
            <a href="https://youtu.be/0I_IIbVqeME?si=fgMed1GBXMXqE6dF" target="_blank" rel="noopener noreferrer" className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-3 rounded-full transition-colors flex items-center shadow-lg">
              <span className="text-xl mr-2">▶</span> Play Video
            </a>
          </div>
        </div>
      </section>
      {/* Related Articles Footer */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🌿 Keep Learning
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="/plantcare/sunlight" className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            ☀️ Sunlight Guide
          </a>
          <a href="/plantcare/watering" className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            💧 Watering Guide
          </a>
          <a href="/plantcare/fertilizer" className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            🌿 Fertilizer Guide
          </a>
        </div>
      </section>
    </main>
  );
}