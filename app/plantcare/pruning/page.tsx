export default function PruningGuidePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-teal-50/40 rounded-xl shadow-md mt-8 border border-teal-100">
      <img
        src="/guides/pruning-hero.jpg"
        alt="Clean gardening shears trimming a leafy green branch"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight">
          ✂️ The Ultimate Pruning Guide
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Pruning can feel terrifying—cutting pieces off your beloved plants feels counterintuitive! But pruning is actually one of the most beneficial things you can do. It removes dead weight, prevents disease, and forces the plant to grow bushier and produce more flowers.
        </p>
      </header>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-teal-200">
        <h2 className="text-3xl font-bold text-teal-900 mb-4">🪴 Why Do We Prune?</h2>
        <p className="text-gray-700">
          Plants direct their energy to the highest tips of their branches (apical dominance). When you cut that tip off, the plant redistributes its energy to the lower dormant buds, causing it to sprout multiple new branches, resulting in a fuller, bushier plant instead of a tall, spindly one.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-teal-500 pb-2 inline-block">
          ✂️ Types of Pruning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-purple-600 mb-2">Deadheading</h3>
            <p className="text-sm text-gray-600 mb-3">
              Snapping or cutting off old, dying flowers. This prevents the plant from wasting energy making seeds and forces it to produce a new flush of fresh flowers instead.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-600 mb-2">Pinching</h3>
            <p className="text-sm text-gray-600 mb-3">
              Using your thumb and forefinger to literally pinch off the tiny, soft new growth at the very top of a stem. This is great for herbs (like basil and mint) to make them branch out.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-slate-700 mb-2">Hard Pruning</h3>
            <p className="text-sm text-gray-600 mb-3">
              Cutting a plant back drastically (often by half or more) during its dormant winter season. This rejuvenates overgrown shrubs and trees for explosive spring growth.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-400 pb-2 inline-block">
          ❌ Common Pruning Mistakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
            <img src="/guides/dirty-shears.jpg" alt="Rusty, dirty gardening pruners" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">Using Dirty Shears</h3>
              <p className="text-sm text-gray-600 mb-4">Pruning creates an open wound on the plant. Using dirty, rusty, or dull shears will transfer fungal spores and bacteria directly into the plant's vascular system.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Fix:</strong> Always wipe your shear blades with rubbing alcohol before you begin, and again when moving between different plants.</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
            <img src="/guides/improper-cut.jpg" alt="Diagram of an improper pruning cut leaving a large stub" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">Leaving a "Stub"</h3>
              <p className="text-sm text-gray-600 mb-4">If you cut a branch too far away from the main stem or node, the leftover "stub" will just die, rot, and invite disease into the main plant.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Fix:</strong> Always make your cut just 1/4 inch above a leaf node (the little bump where leaves grow) at a slight 45-degree angle.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-slate-800 text-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6">💡 Pro Pruning Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-teal-400 text-xl mr-3">✓</span>
            <div><strong>The 1/3 Rule:</strong> A golden rule of gardening: Never remove more than one-third (1/3) of a plant's total foliage at one time, or you risk sending the plant into fatal shock.</div>
          </li>
          <li className="flex items-start">
            <span className="text-teal-400 text-xl mr-3">✓</span>
            <div><strong>Remove the 3 D's First:</strong> Before styling a plant, always cut away anything that is <strong>Dead, Damaged, or Diseased</strong>.</div>
          </li>
        </ul>
      </section>

      <section className="mb-16 text-center">
        <div className="relative inline-block w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg group">
          <img src="/guides/pruning-video-thumbnail.jpg" alt="Video thumbnail for plant pruning techniques" className="w-full h-64 object-cover brightness-75 group-hover:brightness-50 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Watch the Pruning Tutorial</h2>
            <a href="https://www.youtube.com/results?search_query=how+to+prune+houseplants+and+garden+plants" target="_blank" rel="noopener noreferrer" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3 rounded-full transition-colors flex items-center shadow-lg">
              <span className="text-xl mr-2">▶</span> Play Video
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}