import Navbar from "@/components/Navbar";
export default function MintArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-emerald-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/mint/hero.jpg"
        alt="Fresh, bright green mint leaves ready for harvest"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 tracking-tight">
          🌿 The Ultimate Guide to Growing Mint
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Refreshing, aromatic, and incredibly fast-growing, mint is one of the easiest herbs you can grow. Whether you want to brew fresh herbal teas, garnish a dessert, or muddle a summer drink, having fresh mint on hand is a joy. However, its aggressive growth means it requires a specific planting strategy!
        </p>
      </header>

      {/* Warning Section (Crucial for Mint) */}
      <section className="mb-12 bg-red-50 p-6 rounded-xl border border-red-200">
        <h2 className="text-2xl font-bold text-red-800 mb-2 flex items-center gap-2">
          ⚠️ The Golden Rule of Mint
        </h2>
        <p className="text-gray-800">
          <strong>Never plant mint directly in your garden beds!</strong> Mint spreads rapidly via underground runners and will quickly take over your entire garden, choking out other plants. Always grow mint in pots or containers.
        </p>
      </section>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-emerald-500 pb-2 inline-block">
          Delightful Mint Varieties
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Peppermint */}
          <div className="bg-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/mint/peppermint.jpg" 
              alt="Peppermint leaves with dark stems" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-emerald-700">Peppermint</h3>
            <p className="mt-2 text-sm text-gray-600">
              Containing high amounts of menthol, peppermint has a sharp, intense, and cooling flavor. It usually features darker stems and is the absolute best choice for making soothing hot teas and extracting essential oils.
            </p>
          </div>

          {/* Spearmint */}
          <div className="bg-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/mint/spearmint.jpg" 
              alt="Bright green Spearmint leaves" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-emerald-700">Spearmint</h3>
            <p className="mt-2 text-sm text-gray-600">
              The classic culinary mint. Spearmint has a lighter, sweeter, and more delicate flavor compared to peppermint. It is the go-to variety for cooking, chutneys, salads, and muddling into mojitos.
            </p>
          </div>

          {/* Chocolate Mint */}
          <div className="bg-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/mint/chocolate.jpg" 
              alt="Chocolate Mint plant" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-emerald-700">Chocolate Mint</h3>
            <p className="mt-2 text-sm text-gray-600">
              A fascinating hybrid that actually smells and tastes reminiscent of a peppermint patty! It is fantastic for garnishing baked goods, making desserts, or brewing a unique and sweet iced tea.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-emerald-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Essential Care Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-emerald-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Mint is highly adaptable. It grows well in full sun, but it also thrives in <strong>partial shade</strong>. If you live in a very hot climate, afternoon shade will keep the leaves tender and prevent wilting.
            </p>
          </div>

          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-emerald-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Unlike many Mediterranean herbs, mint loves water. Keep the soil <strong>consistently moist</strong> but not soggy. During hot summer months, container-grown mint may need watering every day.
            </p>
          </div>

          <div className="bg-red-200 p-5 rounded-lg shadow-sm border border-emerald-100">
            <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
              ✂️ Pruning & Harvesting
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Harvest frequently! Regularly pinching off the top leaves encourages the plant to grow bushier rather than tall and leggy. Remove any flowers that appear to keep the flavor of the leaves strong.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-400 pb-2 inline-block">
          Common Mint Problems
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Mint Rust (Orange/Brown spots):</strong> A common fungal disease that causes powdery orange spots on the undersides of the leaves. <br/>
              <span className="text-emerald-700 font-medium">Solution:</span> This often happens in crowded, poorly ventilated spaces. Cut the plant back completely (it will regrow!) and ensure the new growth has good air circulation. Do not compost infected leaves.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Woody and Leggy Stems:</strong> The plant is very tall with few leaves at the bottom and a bitter taste. <br/>
              <span className="text-emerald-700 font-medium">Solution:</span> The mint has likely gone to seed. Cut the entire plant down to about 2 inches above the soil line. It will flush out with tender, fresh new growth in a few weeks.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-emerald-900 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Never Buy Mint Again</h2>
        <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
          Mint is incredibly easy to propagate from store-bought cuttings. Watch this tutorial to learn how to root mint in water and plant it in pots for an endless supply!
        </p>
        <a
          href="https://youtu.be/ftls90A6f4Y?si=9-LGsgt-7L_b018H"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Mint Propagation Guide
        </a>
      </section>
    </main>
  );
}