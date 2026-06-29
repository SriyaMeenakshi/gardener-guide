import Navbar from "@/components/Navbar";
export default function ChilliArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-red-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/chilli/hero.jpg"
        alt="Vibrant red and green chillies growing on a bush"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 tracking-tight">
          🌶️ The Ultimate Guide to Growing Chillies
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Add some heat to your garden and your kitchen! Growing your own chillies is incredibly rewarding. From mild and sweet to fiery hot, chilli plants are highly productive, compact enough for balconies, and thrive in warm, sunny conditions.
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-500 pb-2 inline-block">
          Spicy Varieties to Grow
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img src="/plants/chilli/jalapeno.jpg" alt="Green Jalapeno peppers" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-red-700">Jalapeño</h3>
            <p className="mt-2 text-sm text-gray-600">
              A classic, versatile pepper with a mild to medium heat. The thick flesh is perfect for stuffing, pickling, or making homemade salsas. 
            </p>
          </div>
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img src="/plants/chilli/birdseye.jpg" alt="Small red Bird's Eye chillies" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-red-700">Bird's Eye (Thai Chilli)</h3>
            <p className="mt-2 text-sm text-gray-600">
              Small but mighty! These tiny, upward-pointing chillies pack a serious punch and are a staple in Asian cuisine and spicy curries.
            </p>
          </div>
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img src="/plants/chilli/cayenne.jpg" alt="Long Cayenne peppers" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-red-700">Cayenne</h3>
            <p className="mt-2 text-sm text-gray-600">
              Long, slender, and very hot. Cayenne peppers are incredibly prolific and dry beautifully, making them ideal for making your own chilli powder or flakes.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-red-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Care Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-red-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">☀️ Sunlight</h3>
            <p className="mt-3 text-gray-700 text-sm">Chillies demand heat and sunshine. They need at least <strong>6 to 8 hours of direct sunlight</strong> daily to produce maximum fruit.</p>
          </div>
          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-red-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">💧 Watering</h3>
            <p className="mt-3 text-gray-700 text-sm">Water thoroughly, then let the top layer of soil dry out. <strong>Slight water stress</strong> can actually make the chillies hotter, but never let the plant severely wilt.</p>
          </div>
          <div className="bg-green-200 p-5 rounded-lg shadow-sm border border-red-100">
            <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">🌱 Soil</h3>
            <p className="mt-3 text-gray-700 text-sm">Use a rich, well-draining soil. Apply a tomato/vegetable fertilizer once flowers appear to encourage massive fruit production.</p>
          </div>
        </div>
      </section>

      {/* Garden Problems */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-400 pb-2 inline-block">Common Chilli Problems</h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Leaf Curl Virus:</strong> Leaves curl upwards, crinkle, and stunt plant growth (usually spread by pests).<br/>
              <span className="text-red-700 font-medium">Solution:</span> Control whiteflies and aphids with Neem oil. Remove severely infected plants so it doesn't spread.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Flower Drop:</strong> Flowers fall off before forming peppers.<br/>
              <span className="text-red-700 font-medium">Solution:</span> Usually caused by extreme heat, cold nights, or lack of pollination. Give the plant a gentle shake to help spread pollen.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-red-900 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Grow a Massive Chilli Harvest</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">Watch this expert guide on pruning, feeding, and maximizing your pepper yields this season.</p>
        <a href="https://youtu.be/rPlEA5_JrBs?si=rDxgZI0-WZPCCoaj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-red-900 hover:bg-red-50 font-bold px-8 py-4 rounded-full transition-colors">
          <span className="text-xl mr-2">▶</span> Watch Chilli Care Guide
        </a>
      </section>
    </main>
  );
}