import Navbar from "@/components/Navbar";
export default function AloeVeraArticlePage() {
  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 text-gray-800 bg-white rounded-xl shadow-md mt-8 border border-teal-100">
      <Navbar />
      {/* Hero Image */}
      <img
        src="/plants/aloevera/hero.jpg"
        alt="Lush green Aloe Vera plant in a terracotta pot"
        className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-sm"
      />

      {/* Article Header */}
      <header className="mt-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight">
          🌵 The Ultimate Guide to Growing Aloe Vera
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Revered for its incredible healing properties, Aloe Vera is a must-have succulent for any home. Known as the "plant of immortality" in ancient Egypt, the clear gel inside its thick leaves is famous for soothing burns and hydrating skin. Best of all, it is incredibly low-maintenance and thrives on neglect!
        </p>
      </header>

      {/* Varieties Section with Image Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-teal-500 pb-2 inline-block">
          Popular Aloe Varieties
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Aloe Barbadensis Miller */}
          <div className="bg-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/aloevera/miller.jpg" 
              alt="Aloe Barbadensis Miller" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-teal-700">Aloe Barbadensis Miller</h3>
            <p className="mt-2 text-sm text-gray-600">
              This is the "True Aloe" and the most common variety grown for medicinal and cosmetic use. It features thick, fleshy, grey-green leaves that yield the highest quality soothing gel.
            </p>
          </div>

          {/* Aloe Arborescens */}
          <div className="bg-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/aloevera/torch.jpg" 
              alt="Torch Aloe plant" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-teal-700">Aloe Arborescens</h3>
            <p className="mt-2 text-sm text-gray-600">
              Also known as the Torch Aloe, this variety grows in a large, branching shrub form. It is famous for producing striking, bright red, torch-like flowers during the winter months.
            </p>
          </div>

          {/* Aloe Aristata */}
          <div className="bg-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="/plants/aloevera/aristita.jpg" 
              alt="Lace Aloe with white speckles" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-teal-700">Aloe Aristata</h3>
            <p className="mt-2 text-sm text-gray-600">
              Commonly called Lace Aloe, this is a beautiful dwarf variety perfect for small desks and windowsills. It has dark green leaves covered in white speckles and soft, lacy white edges.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Growing Conditions */}
      <section className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-teal-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Essential Care Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-200 p-5 rounded-lg shadow-sm border border-teal-100">
            <h3 className="text-xl font-bold text-orange-500 flex items-center gap-2">
              ☀️ Sunlight
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Aloe Vera loves bright, indirect sunlight. A south or west-facing window is ideal. While they enjoy light, too much intense, direct summer sun can cause the leaves to burn and turn brown or red.
            </p>
          </div>

          <div className="bg-blue-200 p-5 rounded-lg shadow-sm border border-teal-100">
            <h3 className="text-xl font-bold text-blue-500 flex items-center gap-2">
              💧 Watering
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Less is more! Aloe is a succulent that stores water in its leaves. Water deeply, but allow the top 2-3 inches of soil to dry out completely before watering again. In winter, water very sparingly.
            </p>
          </div>

          <div className="bg-green-200 p-5 rounded-lg shadow-sm border border-teal-100">
            <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
              🌱 Soil & Pots
            </h3>
            <p className="mt-3 text-gray-700 text-sm">
              Excellent drainage is mandatory. Use a sandy cactus or succulent potting mix. Always plant Aloe in a pot with drainage holes (terracotta is best as it allows the soil to dry out faster).
            </p>
          </div>
        </div>
      </section>

      {/* Garden Problems & Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-400 pb-2 inline-block">
          Common Aloe Vera Problems
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Mushy, Yellowing Leaves (Root Rot):</strong> The number one killer of Aloe plants is overwatering. <br/>
              <span className="text-teal-700 font-medium">Solution:</span> Stop watering immediately. If the rot is severe, remove the plant from its pot, trim away the black, mushy roots, let it dry for a few days, and repot in fresh, dry soil.
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="text-red-500 font-bold text-xl mr-3">✗</span>
            <div>
              <strong>Thin, Curling Leaves:</strong> The leaves are losing their plumpness and curling inward. <br/>
              <span className="text-teal-700 font-medium">Solution:</span> The plant is using up its own water reserves. It needs a thorough, deep watering. Soak the soil until water runs out the bottom.
            </div>
          </li>
        </ul>
      </section>

      {/* Video Call to Action */}
      <section className="bg-teal-900 text-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold mb-4">Harvesting the Healing Gel</h2>
        <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
          Want to use your Aloe Vera for skincare or burns? Watch this guide on how to safely harvest the leaves and extract the pure gel without damaging the mother plant.
        </p>
        <a
          href="https://youtu.be/O4LQdTgUui8?si=FBGUk0YpBtrdNjq_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-teal-900 hover:bg-teal-50 font-bold px-8 py-4 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          <span className="text-xl mr-2">▶</span> Watch Harvesting Guide
        </a>
      </section>
    </main>
  );
}