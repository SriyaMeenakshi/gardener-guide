export default function PestControlGuidePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-rose-50/40 rounded-xl shadow-md mt-8 border border-rose-100">
      <img
        src="/guides/pest-hero.jpg"
        alt="Person carefully inspecting the underside of a leaf for pests"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 tracking-tight">
          🐞 The Ultimate Pest Control Guide
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          If you grow plants, you will eventually deal with bugs. It is a natural part of gardening! The key is not to panic, but to catch infestations early and treat them using Integrated Pest Management (IPM)—starting with the gentlest solutions before reaching for harsh chemicals.
        </p>
      </header>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-rose-200">
        <h2 className="text-3xl font-bold text-red-900 mb-4">🔍 Early Detection is Everything</h2>
        <p className="text-gray-700">
          Pests multiply exponentially. A few aphids on Monday can turn into hundreds by Friday. Make it a habit to visually inspect your plants (especially the undersides of the leaves and the new, soft growth) every time you water them.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-500 pb-2 inline-block">
          🐛 Know Your Enemy: Common Pests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-700 mb-2">Aphids</h3>
            <p className="text-sm text-gray-600 mb-3">
              Tiny, pear-shaped bugs (usually green, black, or yellow) that cluster on new growth and suck the sap out of the plant.
            </p>
            <p className="text-sm font-semibold text-gray-800">Treatment:</p>
            <p className="text-sm text-gray-600">Blast them off with a strong jet of water, then spray with Insecticidal Soap.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-amber-700 mb-2">Spider Mites</h3>
            <p className="text-sm text-gray-600 mb-3">
              Microscopic arachnids that thrive in hot, dry conditions. They cause leaves to look dusty, stippled, and create fine webbing.
            </p>
            <p className="text-sm font-semibold text-gray-800">Treatment:</p>
            <p className="text-sm text-gray-600">Increase humidity. Spray thoroughly with Neem oil, coating all leaf surfaces.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-stone-700 mb-2">Fungus Gnats</h3>
            <p className="text-sm text-gray-600 mb-3">
              Annoying little black flies buzzing around the soil. Their larvae live in wet soil and eat your plant's roots.
            </p>
            <p className="text-sm font-semibold text-gray-800">Treatment:</p>
            <p className="text-sm text-gray-600">Let the top 2 inches of soil dry out completely. Use yellow sticky traps for adults.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-orange-400 pb-2 inline-block">
          ❌ Common Pest Control Mistakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
            <img src="/guides/chemical-spray.jpg" alt="Harsh chemical pesticide spray burning a leaf" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">Reaching for Harsh Chemicals First</h3>
              <p className="text-sm text-gray-600 mb-4">Strong synthetic pesticides kill pests, but they also kill beneficial insects (like bees and ladybugs) and can chemically burn delicate plant leaves.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Fix:</strong> Always start with organic methods (water blasts, Neem oil, rubbing alcohol swabs) before resorting to synthetics.</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
            <img src="/guides/underside-leaf.jpg" alt="Pests hiding on the underside of a plant leaf" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">Ignoring the Undersides of Leaves</h3>
              <p className="text-sm text-gray-600 mb-4">When applying treatments, many beginners only spray the top of the leaves. 90% of pests live and lay eggs on the hidden undersides!</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Fix:</strong> You must completely drench the plant when treating. Spray under the leaves and down the stems until the liquid drips off.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-red-900 text-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">💡 Pro Pest Control Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-rose-300 text-xl mr-3">✓</span>
            <div><strong>Quarantine New Plants:</strong> Never bring a new plant home and immediately place it next to your others. Keep it in a separate room for 2 weeks to ensure no hidden pests spread to your collection.</div>
          </li>
          <li className="flex items-start">
            <span className="text-rose-300 text-xl mr-3">✓</span>
            <div><strong>Apply Neem Oil at Night:</strong> Never apply oils or soapy sprays during the day. The liquid magnifies sunlight and will severely burn the leaves. Spray in the evening so it can dry overnight.</div>
          </li>
        </ul>
      </section>

      <section className="mb-16 text-center">
        <div className="relative inline-block w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg group">
          <img src="/guides/pest-video-thumbnail.jpg" alt="Video thumbnail for treating common plant pests naturally" className="w-full h-64 object-cover brightness-75 group-hover:brightness-50 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Watch the Pest Control Tutorial</h2>
            <a href="https://www.youtube.com/results?search_query=how+to+treat+plant+pests+naturally" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full transition-colors flex items-center shadow-lg">
              <span className="text-xl mr-2">▶</span> Play Video
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}