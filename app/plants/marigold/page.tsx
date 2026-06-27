import Navbar from "@/components/Navbar";
export default function MarigoldArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-amber-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/marigold/hero.jpg"
        alt="Vibrant orange and yellow marigold flowers in a garden bed"
        className="w-full h-80 md:h-[500px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-700 tracking-tight">
          🌼 The Ultimate Guide to Growing Marigolds
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Bright, cheerful, and virtually indestructible, Marigolds are the workhorses of the summer garden. Known for their brilliant hues of gold, copper, and brass, they not only look spectacular but also act as powerful, natural pest repellents for your vegetable beds. They are the ultimate low-maintenance flower!
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
          Top Marigold Varieties
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* French Marigolds */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/marigold/french.jpg" 
              alt="Compact French Marigold" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-amber-700">French Marigolds</h3>
            <p className="mt-2 text-sm text-gray-600">
              Compact and bushy, rarely exceeding 12 inches in height. They feature smaller, intricate blooms often with mahogany-red highlights. They are perfect for edging garden beds, lining walkways, or planting in small containers.
            </p>
          </div>

          {/* African Marigolds */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/marigold/african.jpg" 
              alt="Tall African Marigold" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-amber-700">African Marigolds</h3>
            <p className="mt-2 text-sm text-gray-600">
              Despite the name, these are native to the Americas. They grow quite tall (up to 3 feet) and produce massive, pom-pom-like double flowers in solid yellow or orange. They are excellent for cutting and background borders.
            </p>
          </div>

          {/* Signet Marigolds */}
          <div className="bg-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/marigold/signet.jpg" 
              alt="Delicate Signet Marigold" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-amber-700">Signet Marigolds</h3>
            <p className="mt-2 text-sm text-gray-600">
              Unlike the other varieties, Signet marigolds have lacy, citrus-scented foliage and hundreds of tiny, single-petaled flowers. They are completely edible and make beautiful, spicy garnishes for salads and desserts.
            </p>
          </div>
        </div>
      </section>

      {/* Companion Planting Bonus Section */}
      <section className="mb-12 bg-amber-100 p-6 md:p-8 rounded-xl border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          🛡️ The Gardener's Best Friend (Companion Planting)
        </h2>
        <p className="text-gray-700">
          Plant marigolds around your tomatoes, peppers, and eggplants! The strong scent of their foliage confuses flying pests, and their roots produce a chemical (alpha-terthienyl) that kills harmful root-knot nematodes in the soil.
        </p>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-amber-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How to Grow and Care for Marigolds
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              They require full, blazing sun. Plant them where they will get <strong>at least 8 hours of direct sunlight</strong>. Too much shade causes them to become leggy and produce fewer blooms while inviting powdery mildew.
            </p>
          </div>

          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Allow the soil to dry out between waterings. Once established, marigolds are highly drought-tolerant. Water them at the base to keep the flowers dry and prevent rotting.
            </p>
          </div>

          <div className="bg-green-200 p-5 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
              🌱 Soil & Fertilizer
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              <strong>Do NOT over-fertilize!</strong> Marigolds actually bloom best in poorer quality soil. If you give them rich, heavily fertilized soil, they will grow massive, lush green leaves but produce very few flowers.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-400 pb-2 inline-block">
          Common Marigold Problems
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Spider Mites:</strong> During very hot, dry spells, the leaves might lose their green color and look dusty or webbed. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Spray the foliage forcefully with a hose to knock the mites off, or use insecticidal soap. Keep the plants properly watered during heatwaves.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Slugs and Snails:</strong> These pests love to devour young marigold seedlings overnight. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Protect young plants with crushed eggshells around the base or use organic slug baits until the plants are large and tough enough to withstand them.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-amber-700 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Deadheading for Endless Blooms</h2>
        <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
          The secret to keeping marigolds blooming until winter is a process called "deadheading." Watch this quick tutorial to learn how to properly snap off old flowers to encourage new growth.
        </p>
        <a
          href="https://youtu.be/hLs-oFz910U?si=N-oILNODeNDDbPYu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-amber-800 hover:bg-amber-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Marigold Care Guide
        </a>
      </section>
    </main>
  );
}