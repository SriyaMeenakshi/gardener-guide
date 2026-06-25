import Navbar from "@/components/Navbar";
export default function TomatoArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-stone-50 rounded-xl shadow-md mt-8 border border-stone-200">
      {/* Hero Image */}
      <Navbar/>
      <img
        src="/plants/tomato/toma.jpg"
        alt="Fresh, ripe red tomatoes growing on a vine"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">
          🍅 The Ultimate Guide to Growing Tomatoes
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Tomatoes are the undisputed crown jewel of the home vegetable garden. Whether you are planting in a sprawling backyard bed or utilizing pots on a sunny balcony, nothing compares to the taste of a warm, sun-ripened, homegrown tomato. This guide will walk you through everything you need to know to grow a bountiful, delicious harvest.
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-red-500 pb-2 inline-block">
          Popular Varieties to Grow
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Cherry Tomatoes */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/tomato/cherrytomato.jpg" 
              alt="Cherry tomatoes in a hand" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-red-700">Cherry Tomatoes</h3>
            <p className="mt-2 text-sm text-gray-600">
              Sweet, bite-sized, and incredibly prolific. Cherry tomatoes are perfect for snacking, salads, and roasting. They are highly adaptable and are the easiest variety to grow in containers or hanging baskets.
            </p>
          </div>

          {/* Roma/Plum Tomatoes */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/tomato/roma.jpg" 
              alt="Oval shaped Roma tomatoes" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-red-700">Roma (Plum) Tomatoes</h3>
            <p className="mt-2 text-sm text-gray-600">
              Known for their dense, meaty texture and low water content, Roma tomatoes are the absolute best choice for making thick homemade sauces, pastes, and canning. They typically produce their harvest all at once.
            </p>
          </div>

          {/* Beefsteak Tomatoes */}
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/tomato/beefstack.jpg" 
              alt="Large, ribbed Beefsteak tomato" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-red-700">Beefsteak Tomatoes</h3>
            <p className="mt-2 text-sm text-gray-600">
              The giants of the tomato world! These large, juicy, and heavily ribbed tomatoes are perfect for slicing thick to put on sandwiches and burgers. They require sturdy staking and patience as they take longer to ripen.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-red-50 p-6 md:p-8 rounded-xl border border-red-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Essential Growing Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Tomatoes are sun-worshippers. They need a minimum of <strong>6 to 8 hours of direct, unfiltered sunlight</strong> every day to produce flowers and ripen their fruit effectively.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Consistency is everything. Water deeply at the base of the plant to encourage deep root systems. <strong>Never water from above</strong>, as wet leaves easily lead to fungal diseases. Keep soil moist but not soggy.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2">
              🌱 Soil & Support
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Plant deep in rich, well-draining soil loaded with compost. Tomatoes root along their buried stems! Always provide support early using stakes, cages, or trellises before the plant gets too heavy.
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2 inline-block">
          Common Tomato Problems & Solutions
        </h2>
        <p className="mb-4 text-gray-600">
          Tomatoes can be heavy feeders and susceptible to a few specific issues. Keep an eye out for these:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Blossom End Rot:</strong> Dark, sunken, leathery spots appear on the bottom of the tomatoes. <br/>
              <span className="text-green-700 font-medium">Solution:</span> This is caused by a calcium deficiency, usually triggered by inconsistent watering. Water regularly and add crushed eggshells or a calcium supplement to the soil.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Early & Late Blight:</strong> Yellowing leaves with brown spots starting from the bottom of the plant. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Remove affected leaves immediately. Prevent it by watering only at the base, mulching around the plant to prevent soil splashing, and ensuring good air circulation.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Tomato Hornworms:</strong> Massive green caterpillars that can defoliate a plant overnight. <br/>
              <span className="text-green-700 font-medium">Solution:</span> Handpick them off the plant (they glow under a blacklight at night!) or use organic Bt (Bacillus thuringiensis) spray.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-red-900 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Master the Art of Tomato Growing</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          From proper pruning techniques (suckers!) to staking and feeding, watch this comprehensive visual guide to guarantee a massive tomato harvest this season.
        </p>
        <a
          href="https://youtu.be/eySTo2GgvoY?si=d4VXjei9J2hBMIOa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-red-900 hover:bg-red-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Tomato Growing Guide
        </a>
      </section>

    </main>
  );
}