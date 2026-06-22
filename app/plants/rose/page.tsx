import Navbar from "@/components/Navbar";
export default function RoseArticlePage() {
  return (
// Change your <main> tag to this:
// Change your <main> tag to this:
<main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-stone-50 rounded-xl shadow-md mt-8 border border-stone-200">   
        <Navbar />   
    <img
        src="/plants/rose/rose-hero.jpg"
        alt="Beautiful blooming red rose in a home garden"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-md"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          🌹 The Ultimate Guide to Growing Roses
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Whether you are setting up a balcony mini-garden or a lush backyard landscape, the rose is the undisputed queen of flowering plants. <strong>Roses are available in a stunning array of colors, from deep, passionate reds and pure, serene whites to vibrant yellows and unique blends,</strong> each with a captivating fragrance and unique character. This guide is your map to cultivating these magnificent flowers.
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-2 inline-block">
          Explore the Beautiful Varieties
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Hybrid Variety */}
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/plants/rose/hybridtea.jpg" 
              alt="Hybrid Tea Rose" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-700">Hybrid Tea Roses</h3>
            <p className="mt-2 text-gray-600">
              Famous for their large, high-centered buds and long, straight stems. These are perfect for cut-flower arrangements and bring an elegant, classic look to your home garden. They require dedicated pruning and excellent sunlight.
            </p>
          </div>

          {/* Indian Variety */}
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/plants/rose/desirose.jpg" 
              alt="Indian Desi Gulab" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-700">Indian 'Desi' Gulab</h3>
            <p className="mt-2 text-gray-600">
              Highly fragrant and remarkably heat-tolerant, the Desi Gulab is a staple in Indian gardens. These native varieties are hardier, bloom profusely, and are excellent for making homemade rose water or organic compost additions.
            </p>
          </div>

          {/* Yellow Variety - NEW */}
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/plants/rose/yellowrose.JPG" 
              alt="Yellow Rose Bush" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-700">Yellow Roses</h3>
            <p className="mt-2 text-gray-600">
              Inject unparalleled brightness into your garden with cheerful yellow roses. Symbolizing friendship and joy, they can create a vibrant 'sunny' spot. Many modern yellow varieties are exceptionally robust and bloom throughout the season, but ensuring good air circulation is key.
            </p>
          </div>

          {/* White Variety - NEW */}
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/plants/rose/white-rose.JPG" 
              alt="Pure White Rose" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-700">White Roses</h3>
            <p className="mt-2 text-gray-600">
              For a touch of pure elegance and tranquility, white roses are an exquisite choice. Their clean lines and serene beauty make them ideal for creating peaceful 'moon garden' effects or sophisticated floral designs. They require excellent sunlight and careful attention to keep their blooms spotless.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions (SEO Heavy) */}
      <section className="mb-12 bg-green-50 p-6 md:p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Essential Care & Growing Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Roses are sun-loving plants. They require a minimum of <strong>6–8 hours of direct sunlight</strong> daily to produce abundant blooms and resist diseases. Morning sunlight is especially crucial to dry the dew off their leaves.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Deep, consistent watering is key. Water at the base of the plant 2–3 times a week, avoiding the foliage to prevent fungal growth. The soil should be kept moist, but never waterlogged.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
              🌱 Soil & Fertilizer
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Plant in rich, well-draining loamy soil with a slightly acidic pH (6.0 to 6.5). Feed them every 4-6 weeks during the growing season with a balanced organic compost or a dedicated rose fertilizer.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-red-500 pb-2 inline-block">
          Common Garden Problems & Solutions
        </h2>
        <p className="mb-4 text-gray-600">
          Even the most careful gardeners face pest issues. Here is how to keep your roses healthy:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Aphids & Thrips:</strong> These tiny pests suck the sap from new growth. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Spray organic Neem oil diluted in water or use an insecticidal soap once a week.
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Black Spot & Powdery Mildew:</strong> Fungal diseases caused by damp leaves and poor air circulation. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Always water at the base of the plant, prune the center of the bush to allow air flow, and apply a fungicide if spots appear.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-gray-900 text-white rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Learn by Watching</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Want a step-by-step visual guide? Watch this comprehensive tutorial on how to plant, prune, and maintain roses in your home garden for maximum blooms.
        </p>
        <a
          href="https://youtu.be/84NkW-xp39E?si=VaeFSyjCbcuItrKq"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Gardening Tutorial
        </a>
      </section>

    </main>
  );
}