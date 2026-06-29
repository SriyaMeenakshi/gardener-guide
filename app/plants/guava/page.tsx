import Navbar from "@/components/Navbar";
export default function GuavaArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-green-100">
      <Navbar />
      <img src="/plants/guava/hero.jpg" alt="Fresh green guavas on a tree branch" className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm" />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 tracking-tight">
          🍐 The Ultimate Guide to Growing Guavas
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Guavas are beautiful, fast-growing tropical trees that produce incredibly fragrant, vitamin C-rich fruit. They are remarkably resilient, drought-tolerant once established, and can even be grown successfully in large containers!
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-2 inline-block">Top Varieties to Grow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img src="/plants/guava/safeda.jpg" alt="White flesh guava" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-green-700">Allahabad Safeda</h3>
            <p className="mt-2 text-sm text-gray-600">The most famous Indian commercial variety. It features smooth yellow-green skin and soft, sweet, white flesh with fewer seeds.</p>
          </div>
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img src="/plants/guava/pink.jpg" alt="Pink flesh guava" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-green-700">Pink/Red Guava</h3>
            <p className="mt-2 text-sm text-gray-600">Known for its striking deep pink interior and highly aromatic, slightly musky flavor. It is fantastic for making jams and juices.</p>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-green-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Care Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">☀️ Sunlight</h3>
            <p className="mt-3 text-gray-700 text-sm">Plant your guava tree in the sunniest spot possible. They need full, direct sun (8+ hours) to produce sweet fruit.</p>
          </div>
          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">💧 Watering</h3>
            <p className="mt-3 text-gray-700 text-sm">Young trees need regular deep watering. Mature trees are drought-tolerant but need consistent water during flower and fruit development to prevent the fruit from dropping.</p>
          </div>
          <div className="bg-red-200 p-5 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">✂️ Pruning</h3>
            <p className="mt-3 text-gray-700 text-sm">Guavas fruit on new growth. Prune the tips of the branches regularly to encourage the tree to bush out and produce more fruiting wood.</p>
          </div>
        </div>
      </section>

      <section className="bg-green-800 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Master Guava Tree Care</h2>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">Watch this tutorial on the "pinching" method to force your guava tree to branch out and multiply its fruit yield in a pot.</p>
        <a href="https://youtu.be/pVNAgind6Pg?si=I9gMOUIvkT2hiHO2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-green-900 hover:bg-green-50 font-bold px-8 py-4 rounded-full transition-colors">
          <span className="text-xl mr-2">▶</span> Watch Guava Care Guide
        </a>
      </section>
    </main>
  );
}