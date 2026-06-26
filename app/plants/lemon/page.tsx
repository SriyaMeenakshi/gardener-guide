import Navbar from "@/components/Navbar";
export default function LemonArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-stone-50 rounded-xl shadow-md mt-8 border border-stone-200">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/lemon/lemon-hero.jpg"
        alt="Fresh yellow lemons growing on a lush green tree"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-800 tracking-tight">
          🍋 The Ultimate Guide to Growing Lemons
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Growing a lemon tree in your home garden or on a sunny balcony is an incredibly rewarding experience. Not only do they provide a year-round lush evergreen presence and intoxicatingly fragrant white blossoms, but there is nothing quite like harvesting your own fresh, zesty lemons for cooking and drinks.
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-400 pb-2 inline-block">
          Best Lemon Varieties for Home Gardens
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Meyer Lemon */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/lemon/meyer-lemon.jpg" 
              alt="Smooth Meyer Lemons" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-yellow-700">Meyer Lemon</h3>
            <p className="mt-2 text-sm text-gray-600">
              A cross between a regular lemon and a mandarin orange. It has a sweeter, less acidic flavor and thin skin. It is naturally dwarf-sized, making it the absolute best choice for growing in pots and containers.
            </p>
          </div>

          {/* Eureka Lemon */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/lemon/eureka-lemon.jpg" 
              alt="Textured Eureka Lemon" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-yellow-700">Eureka Lemon</h3>
            <p className="mt-2 text-sm text-gray-600">
              The classic grocery store lemon. It produces highly acidic, tart, and juicy fruit. It thrives in warm climates and tends to bear fruit year-round, but requires a bit more space if planted in the ground.
            </p>
          </div>

          {/* Lisbon Lemon */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/lemon/lisbon-lemon.jpg" 
              alt="Lisbon Lemon tree branch" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-yellow-700">Lisbon Lemon</h3>
            <p className="mt-2 text-sm text-gray-600">
              Very similar in taste and appearance to the Eureka, but the Lisbon tree is much hardier. It tolerates heat, cold, and wind better than other varieties, making it ideal for outdoor planting in challenging climates.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-yellow-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Essential Growing Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-yellow-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Citrus trees are sun lovers. They require <strong>8 to 12 hours of direct sunlight</strong> daily. If growing indoors, place them by your brightest south-facing window or use a grow light.
            </p>
          </div>

          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-yellow-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Water deeply, but infrequently. Allow the top 2-3 inches of soil to dry out completely before watering again. Lemon trees hate having "wet feet," which causes root rot.
            </p>
          </div>

          <div className="bg-green-200 p-5 rounded-lg shadow-sm border border-yellow-100">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
              🌱 Soil & Fertilizer
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Use a well-draining, slightly acidic soil mix (pH 5.5-6.5). Lemons are heavy feeders—apply a specific citrus fertilizer rich in nitrogen, iron, and zinc during the active growing season.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2 inline-block">
          Common Lemon Tree Problems
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div >
              <strong>Yellowing Leaves with Green Veins:</strong> This is a sign of Iron Chlorosis (iron deficiency), very common in potted citrus. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Apply a liquid iron chelate foliar spray or add a citrus-specific micronutrient fertilizer to the soil.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Citrus Leaf Miner:</strong> Silvery, winding trails appear on the new, tender leaves, causing them to curl and distort. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Spray organic Neem oil on new growth every 10-14 days to deter the moth from laying eggs.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-yellow-800 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Master Citrus Care</h2>
        <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
          Want a massive lemon harvest even in small pots? Watch this complete guide on fertilizing, pruning, and watering your lemon tree.
        </p>
        <a
          href="https://youtu.be/XC67v3q-m28?si=33SkhOfq-FjEex3l"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-yellow-900 hover:bg-yellow-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Lemon Care Guide
        </a>
      </section>
    </main>
  );
}