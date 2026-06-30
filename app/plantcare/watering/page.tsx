import Navbar from "@/components/Navbar";
export default function WateringGuidePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-blue-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/guides/watering.jpg"
        alt="Person watering plants in a garden with a watering can"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
          💧 The Ultimate Watering Guide
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Watering is the most common reason indoor and outdoor plants die. Whether you are drowning your roots or leaving them parched, getting the balance right is the secret to a thriving garden. This guide breaks down exactly when, how, and how much you should water your plants.
        </p>
      </header>

      {/* Why Watering is Important */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-blue-400 pb-2 inline-block">
          🌱 Why Proper Watering is Essential
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Plants use water not just to stay upright, but to transport vital nutrients from the soil up into their leaves. Without proper watering, photosynthesis slows down, growth stops, and the plant becomes highly vulnerable to pests and diseases. 
        </p>
      </section>

      {/* When should you water? */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-cyan-500 pb-2 inline-block">
          🕒 When Should You Water?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-amber-500 mb-3">🌅 Morning (Best)</h3>
            <p className="text-sm text-gray-600">
              Watering between 6 AM and 10 AM is the golden rule. It equips the plant with hydration before the midday heat hits, and gives any splashed leaves plenty of time to dry in the sun, preventing fungal diseases.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-indigo-500 mb-3">🌆 Evening (Okay)</h3>
            <p className="text-sm text-gray-600">
              If you miss the morning, late afternoon or early evening is second best. However, be very careful not to wet the leaves. Leaves that stay wet overnight are a breeding ground for mildew and fungus.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-emerald-600 mb-3">🍂 Seasonal Shifts</h3>
            <p className="text-sm text-gray-600">
              Plants drink less when they aren't actively growing. You will need to water frequently during the hot summer and significantly reduce your watering schedule during the cooler winter months.
            </p>
          </div>
        </div>
      </section>

      {/* How much water? */}
      <section className="mb-12 bg-cyan-50 p-6 md:p-8 rounded-xl border border-cyan-100">
        <h2 className="text-3xl font-bold text-cyan-900 mb-6">
          💦 How Much Water Do Plants Need?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-cyan-800 mb-2">🏠 Indoor Plants</h3>
            <p className="text-sm text-gray-700">Check weekly. Only water when the top 2 inches of soil are dry. Less light means less water needed.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-green-800 mb-2">🌳 Outdoor Plants</h3>
            <p className="text-sm text-gray-700">Water deeply 1-2 times a week to encourage deep root growth, rather than shallow daily watering.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-orange-800 mb-2">🍅 Vegetables</h3>
            <p className="text-sm text-gray-700">Require consistent moisture. Check daily during peak summer. Drought causes split fruits and bitter greens.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-pink-800 mb-2">🌸 Flowering Plants</h3>
            <p className="text-sm text-gray-700">Keep moist but not soggy. Severe dryness will cause them to drop their buds before they even open.</p>
          </div>
        </div>
      </section>

      {/* Common Mistakes (With Images) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-500 pb-2 inline-block">
          ❌ Common Watering Mistakes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overwatering */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-red-100">
            <img 
              src="/guides/overwatering.jpg" 
              alt="Yellow, drooping leaves and wet soil indicating overwatering" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-red-700 mb-2">Overwatering</h3>
            <p className="text-gray-700 text-sm mb-3">
              This is the #1 plant killer. Roots need oxygen to breathe; when sitting in water, they drown and rot.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Leaves turn pale yellow and feel soft or mushy.</li>
              <li>• The plant droops despite the soil being wet.</li>
              <li>• Soil smells swampy or has mold on the surface.</li>
            </ul>
          </div>

          {/* Underwatering */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-200">
            <img 
              src="/guides/underwatering.jpg" 
              alt="Crispy, brown, and dry leaves indicating underwatering" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-orange-700 mb-2">Underwatering</h3>
            <p className="text-gray-700 text-sm mb-3">
              The plant is dehydrated and unable to sustain its foliage.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Leaves turn brown, crispy, and dry at the edges.</li>
              <li>• The entire plant wilts and looks lifeless.</li>
              <li>• Soil pulls away from the edges of the pot.</li>
            </ul>
          </div>
        </div>

        {/* Watering Leaves Warning */}
        <div className="mt-6 bg-red-50 p-5 rounded-lg border border-red-200 flex items-start gap-4">
          <span className="text-3xl">💦</span>
          <div>
            <h3 className="text-lg font-bold text-red-800">Stop Watering the Leaves!</h3>
            <p className="text-gray-700 text-sm">
              Always aim the water directly at the base of the plant (the soil). Wet leaves invite powdery mildew, black spots, and bacterial blight. In the hot sun, water droplets can even act as magnifying glasses and scorch the foliage.
            </p>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          💡 Pro Watering Tips
        </h2>
        <ol className="text-gray-700 space-y-4">
          <li>
            <strong className="text-blue-600">1. Always Check the Soil: </strong>
             Do not stick strictly to a calendar. Stick your finger 2 inches into the soil. If it's dry, water. If it's moist, wait a few days.
          </li>
          <li>
            <strong className="text-blue-600">2. Water Deeply: </strong> A quick splash on the surface does nothing. Water until it drains out the bottom of the pot to ensure the entire root ball is hydrated.
          </li>
          <li>
            <strong className="text-blue-600">3. Avoid Midday Watering: </strong> Watering at noon when the sun is hottest means most of the water evaporates before the roots can absorb it.
          </li>
          <li>
            <strong className="text-blue-600">4. Ensure Drainage: </strong> 
            Never leave a plant sitting in a saucer full of water for more than 30 minutes. Empty the excess!
          </li>
        </ol>
      </section>

      {/* Video Call to Action */}
      <section className="bg-blue-900 text-white rounded-xl p-8 text-center shadow-md mb-12">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Still unsure if you are watering correctly? Watch this visual tutorial to see exactly how to check soil moisture and master the bottom-watering technique for indoor plants.
        </p>
        <a
          href="https://youtu.be/R8n4hG7NXbY?si=5R6J_LOZf1q0vVrn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Watering Tutorial
        </a>
      </section>

      {/* Related Articles Footer */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🌿 Keep Learning
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="/plantcare/sunlight" className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            ☀️ Sunlight Guide
          </a>
          <a href="/plantcare/soil" className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            🌱 Soil Guide
          </a>
          <a href="/plantcare/fertilizer" className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
            🌿 Fertilizer Guide
          </a>
        </div>
      </section>
    </main>
  );
}