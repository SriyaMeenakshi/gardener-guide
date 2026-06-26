import Navbar from "@/components/Navbar";
export default function HibiscusArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-pink-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/hibiscus/hero.jpg"
        alt="Vibrant tropical hibiscus flower hanging "
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 tracking-tight">
          🌺 The Ultimate Guide to Growing Hibiscus
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          With their massive, trumpet-shaped blooms and deep green foliage, Hibiscus plants instantly bring a touch of the tropics to any garden. While the flowers may only last for a single day, a healthy plant will reward you with continuous, breathtaking blooms all season long.
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-pink-400 pb-2 inline-block">
          Stunning Hibiscus Varieties
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Tropical Hibiscus */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/hibiscus/tropical.jpg" 
              alt="Glossy leaved Tropical Hibiscus" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-pink-700">Tropical Hibiscus</h3>
            <p className="mt-2 text-sm text-gray-600">
              Famous for their glossy, dark green leaves and brilliant, warm-colored flowers. They are extremely frost-sensitive and are best grown in warm climates or as container plants that can be brought indoors during winter.
            </p>
          </div>

          {/* Hardy Hibiscus */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/hibiscus/hardy.jpg" 
              alt="Massive Hardy Hibiscus bloom" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-pink-700">Hardy Hibiscus</h3>
            <p className="mt-2 text-sm text-gray-600">
              These perennials can survive freezing winters! They die back to the ground in late fall but emerge in spring to produce massive, "dinner-plate" sized flowers. Excellent for permanent garden beds.
            </p>
          </div>

          {/* Rose of Sharon */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/hibiscus/rose-of-sharon.jpg" 
              alt="Rose of Sharon shrub" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-pink-700">Rose of Sharon</h3>
            <p className="mt-2 text-sm text-gray-600">
              A large, woody shrub or small tree variety of hibiscus. It blooms profusely in late summer when many other plants have stopped blooming, offering gorgeous pastel flowers with contrasting dark centers.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-pink-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Essential Care Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Hibiscus requires full sun to bloom abundantly. Aim for at least <strong>6 to 8 hours of direct sunlight</strong>. In extremely hot climates, some afternoon shade can prevent the plant from wilting.
            </p>
          </div>

          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Tropical hibiscus are thirsty plants. In the heat of summer, they may need daily watering. Keep the soil consistently moist but never soggy. If the plant drops its buds, it's often a watering issue.
            </p>
          </div>

          <div className="bg-green-200 p-5 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
              🌱 Soil & Fertilizer
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Use a rich, well-draining soil. Hibiscus require a lot of <strong>Potassium</strong> for large blooms, but they can be sensitive to high Phosphorus. Use a fertilizer specifically formulated for hibiscus or a high-potassium mix.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-red-400 pb-2 inline-block">
          Common Hibiscus Problems
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Bud Drop (Flowers falling off before opening):</strong> <br/>
              <span className="text-green-700 font-medium">Solution:</span> This is usually caused by stress: extreme heat, sudden cold drafts, under-watering, or over-watering. Check the soil moisture first and ensure the plant is protected from harsh winds.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Aphids & Whiteflies:</strong> These pests love the soft, juicy new growth and buds of the hibiscus. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Blast them off with a strong jet of water from the hose, then follow up with an insecticidal soap or Neem oil spray in the early evening.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-pink-900 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Get More Hibiscus Blooms</h2>
        <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
          Learn the secrets to pruning, fertilizing, and overwintering your hibiscus plants so they produce dozens of flowers simultaneously.
        </p>
        <a
          href="https://youtu.be/qNhzpWkPJb8?si=KxvB7THbCVgZ8psj"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-pink-900 hover:bg-pink-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Hibiscus Care Guide
        </a>
      </section>
    </main>
  );
}