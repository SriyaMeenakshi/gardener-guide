import Navbar from "@/components/Navbar";
export default function PapayaArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-orange-100">
      <Navbar />
      <img src="/plants/papaya/hero.jpg" alt="Papaya tree heavy with fruit" className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm" />

      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 tracking-tight">
          🥭 The Ultimate Guide to Growing Papayas
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Papayas are magnificent, fast-growing tropical plants that can grow from seed to a fruit-bearing tree in less than a year! Their massive leaves add an instant jungle feel to your yard, and homegrown papayas are unimaginably sweet compared to store-bought ones.
        </p>
      </header>

      {/* Sex of the Tree Warning */}
      <section className="mb-12 bg-amber-100 p-6 rounded-xl border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">⚠️ Understanding Papaya Genders</h2>
        <p className="text-gray-800">
          Papaya plants can be male, female, or hermaphrodite. <strong>Male trees do not produce fruit.</strong> For a home garden, always try to buy "Hermaphrodite" seeds (like the Red Lady variety) because they self-pollinate and guarantee fruit on every single tree.
        </p>
      </section>

      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Care Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">☀️ Sunlight & Warmth</h3>
            <p className="mt-3 text-gray-700 text-sm">Papayas absolutely require full sun and plenty of heat. They are highly frost-sensitive and should be planted in the warmest, most protected spot in your garden.</p>
          </div>
          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">💧 Watering (Crucial)</h3>
            <p className="mt-3 text-gray-700 text-sm">Papayas are extremely susceptible to root rot. They need plenty of water to support massive leaves and fruit, but the <strong>water must drain away instantly</strong>. Never let water pool around the base.</p>
          </div>
          <div className="bg-green-200 p-5 rounded-lg shadow-sm border border-orange-100">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">🌱 Heavy Feeding</h3>
            <p className="mt-3 text-gray-700 text-sm">Because they grow so rapidly, they are heavy feeders. Apply a thick layer of compost or aged manure around the base, and feed with a balanced fertilizer every two weeks.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-red-400 pb-2 inline-block">Common Papaya Problems</h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Papaya Ringspot Virus:</strong> Leaves become mottled/yellow, and the fruit develops distinct ring patterns. <br/>
              <span className="text-orange-700 font-medium">Solution:</span> This is incurable and spread by aphids. Remove and destroy the infected plant immediately. Always plant virus-resistant varieties if possible.
            </div>
          </li>
        </ul>
      </section>

      <section className="bg-orange-600 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Grow Papaya from Seed</h2>
        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">Want to grow a papaya tree from the seeds of a store-bought fruit? Watch this step-by-step guide on germinating and transplanting them safely.</p>
        <a href="https://youtu.be/iUceYy_ZZJA?si=4CPAA3WWTu3V_wxM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-orange-700 hover:bg-orange-50 font-bold px-8 py-4 rounded-full transition-colors">
          <span className="text-xl mr-2">▶</span> Watch Papaya Care Guide
        </a>
      </section>
    </main>
  );
}