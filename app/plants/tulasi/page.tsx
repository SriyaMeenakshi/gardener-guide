import Navbar from "@/components/Navbar";

export default function TulasiArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-stone-50 rounded-xl shadow-md mt-8 border border-stone-200">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/tulasi/tulasihero.png"
        alt="Tulasi kalyanam (Holy Basil plant in a traditional Indian courtyard)"
        className="w-full h-full md:h-[500px] object-cover rounded-xl shadow-md"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 tracking-tight">
          🌿 The Sacred Guide to Growing Tulasi
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Revered as the "Queen of Herbs," Tulasi (Holy Basil) is much more than just a garden plant; it is a sacred presence in Indian households. Known for its profound spiritual significance and powerful Ayurvedic properties, growing a healthy Tulasi plant brings both peace to the mind and wellness to the body. This guide will help you nurture and care for this divine plant at home.
        </p>
      </header>

      {/* Medicinal & Traditional Importance Section */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-100">
        <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-green-500 pb-2 inline-block">
          Tradition Meets Wellness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-700 mb-3">🙏 Cultural Significance</h3>
            <p className="text-gray-600">
              In Hindu tradition, Tulasi is considered the earthly manifestation of the Goddess Tulasi and is deeply associated with Lord Vishnu. Placed in the courtyard center (Tulasi Vrindavan), it is worshipped daily for prosperity, spiritual purity, and to ward off negative energy from the home.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-700 mb-3">⚕️ Medicinal Miracles</h3>
            <p className="text-gray-600">
              A cornerstone of Ayurveda, Tulasi is an adaptogen that helps the body counter stress. Chewing raw leaves or brewing them into herbal tea helps boost immunity, relieves respiratory illnesses like coughs and colds, and acts as a potent antioxidant and anti-inflammatory agent.
            </p>
          </div>
        </div>
      </section>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-green-900 mb-6 border-b-2 border-green-500 pb-2 inline-block">
          Sacred Varieties of Tulasi
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Krishna Tulasi */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
            <img 
              src="/plants/tulasi/krishnatulasi.jpg" 
              alt="Krishna Tulasi with purple-tinged leaves" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-800">Krishna Tulasi (Shyama Tulasi)</h3>
            <p className="mt-2 text-gray-600">
              Characterized by its dark purple or purplish-green leaves and stems. It has a sharp, peppery, and crisp flavor. Because of its high medicinal concentration, it is widely used in Ayurveda to treat throat infections, respiratory ailments, and skin issues.
            </p>
          </div>

          {/* Vishnu Tulasi */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
            <img 
              src="/plants/tulasi/vishnutulasi.jpg" 
              alt="Vishnu Tulasi with bright green leaves" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-800">Vishnu Tulasi (Rama Tulasi)</h3>
            <p className="mt-2 text-gray-600">
              This variety features bright, broad green leaves and a milder, sweeter fragrance compared to Krishna Tulasi. It is the most commonly found variety in Indian households and is highly favored for daily worship and creating soothing herbal teas.
            </p>
          </div>

          {/* Lakshmi Tulasi */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
            <img 
              src="/plants/tulasi/lakshmitulasi.jpg" 
              alt="Lakshmi Tulasi plant" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-800">Lakshmi Tulasi</h3>
            <p className="mt-2 text-gray-600">
              Often considered a close sibling to Rama Tulasi, the Lakshmi Tulasi is specifically planted and worshipped to attract wealth, harmony, and prosperity to the household. It boasts lush green foliage and thrives beautifully in well-lit courtyards.
            </p>
          </div>

          {/* Vana Tulasi (Added to balance the 2x2 grid) */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
            <img 
              src="/plants/tulasi/wild.jpg" 
              alt="Vana Tulasi (Wild Basil)" 
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-800">Vana Tulasi (Wild Tulasi)</h3>
            <p className="mt-2 text-gray-600">
              Native to the Himalayas and Indian plains, this wild variety grows much taller and has lighter green leaves with a strong, lemony aroma. While less common for daily home worship, it is highly valued for enhancing immunity and creating essential oils.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-green-50/80 p-6 md:p-8 rounded-xl border border-green-100">
        <h2 className="text-3xl font-bold text-green-900 mb-6">
          How to Grow & Care for Tulasi
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Tulasi is a tropical plant that loves the sun. It requires at least <strong>6–8 hours of bright, direct sunlight</strong> daily. Place it on an east-facing balcony or courtyard to catch the gentle, auspicious morning sun.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Keep the soil slightly moist but never soggy. Water it daily during Indian summers, but reduce watering significantly in winter. <strong>Overwatering is the #1 cause of Tulasi dying</strong>, so ensure the top inch of soil is dry before watering again.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
              🌱 Soil & Pruning
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Use a well-draining potting mix (mix garden soil, sand, and vermicompost). To keep the plant bushy and healthy, regularly pinch off the <strong>Manjari (flower spikes/seeds)</strong> as soon as they appear, so the plant focuses on growing leaves.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-red-500 pb-2 inline-block">
          Common Problems & Solutions
        </h2>
        <ul className="space-y-4 bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
          <li className="flex items-start">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Yellowing Leaves & Root Rot:</strong> Usually caused by overwatering and poor drainage, especially during monsoons or winters. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Ensure your pot has drainage holes. Stop watering until the soil completely dries out. Add a handful of sand to the soil to improve drainage.
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Mealybugs & Spider Mites:</strong> Tiny white cotton-like pests or webs on the undersides of leaves. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Avoid chemical pesticides since you consume the leaves. Spray the plant with a mild solution of organic Neem oil mixed with a few drops of liquid dish soap and water.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-green-900 text-white rounded-xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Learn by Watching</h2>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Want to ensure your Holy Basil thrives year-round? Watch this traditional and practical guide on how to plant, prune the 'Manjari', and care for your Tulasi plant at home.
        </p>
        <a
          href="https://youtu.be/uhYnR1ciT7M?si=4xlAICe3I_00ECdU"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-green-950 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Tulasi Care Tutorial
        </a>
      </section>

    </main>
  );
}