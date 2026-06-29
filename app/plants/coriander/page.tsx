import Navbar from "@/components/Navbar";
export default function CorianderArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-lime-100">
      <Navbar />

      <img src="/plants/coriander/hero.jpg" alt="Lush green coriander leaves" className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm" />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-lime-900 tracking-tight">
          🌿 The Ultimate Guide to Growing Coriander (Cilantro)
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Coriander is an essential culinary herb used worldwide. You get two harvests from one plant: the fresh, citrusy leaves (cilantro) and the warm, spicy seeds (coriander). While it grows fast, it has a reputation for being tricky in hot weather.
        </p>
      </header>

      {/* Crucial Tip Section */}
      <section className="mb-12 bg-green-100 p-6 rounded-xl border border-green-200">
        <h2 className="text-2xl font-bold text-green-900 mb-2">💡 The Secret to Coriander: Depth!</h2>
        <p className="text-gray-800">
          Coriander develops a deep taproot. <strong>Never transplant it</strong>, as disturbing the root causes it to bolt (go to seed prematurely). Always sow seeds directly into a deep pot (at least 10-12 inches) or straight into your garden bed.
        </p>
      </section>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-lime-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Care Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-lime-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">⛅ Sunlight</h3>
            <p className="mt-3 text-gray-700 text-sm">Coriander loves cool weather. In spring/autumn, give it full sun. In summer heat, <strong>partial or afternoon shade is mandatory</strong> to stop it from going to seed too fast.</p>
          </div>
          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-lime-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">💧 Watering</h3>
            <p className="mt-3 text-gray-700 text-sm">Keep the soil consistently moist but never waterlogged. Do not let the soil dry out completely, as drought stress immediately triggers bolting.</p>
          </div>
          <div className="bg-red-200 p-5 rounded-lg shadow-sm border border-lime-100">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">✂️ Harvesting</h3>
            <p className="mt-3 text-gray-700 text-sm">Harvest outer leaves regularly once the plant is 6 inches tall. If white flowers appear, you can let them turn into seeds, dry them, and grind them into coriander powder!</p>
          </div>
        </div>
      </section>

      <section className="bg-lime-900 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Stop Your Coriander from Dying</h2>
        <p className="text-lime-100 mb-6 max-w-2xl mx-auto">Learn the exact method to split coriander seeds, sow them properly, and grow a bushy, never-ending supply of cilantro.</p>
        <a href="https://youtu.be/A1tgo68-DH8?si=fFccU6BzjevMAU8m" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-lime-900 hover:bg-lime-50 font-bold px-8 py-4 rounded-full transition-colors">
          <span className="text-xl mr-2">▶</span> Watch Coriander Growing Guide
        </a>
      </section>
    </main>
  );
}