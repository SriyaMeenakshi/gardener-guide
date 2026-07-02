import Link from "next/link";

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Link href="/plants" className="block group">
          <div className="bg-white text-black p-8 rounded-2xl h-full border-4 border-transparent group-hover:border-green-500 transition-all shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-3">🏡 Plants for Your Home Garden 🌲</h2>
            <p className="text-gray-600 font-medium">Discover flowers, herbs, medicinal, and kitchen garden plants.</p>
          </div>
        </Link>

        <Link href="/plantcare" className="block group">
          <div className="bg-white text-black p-8 rounded-2xl h-full border-4 border-transparent group-hover:border-green-500 transition-all shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-3">💧 Plant Care Tips 👩‍🌾</h2>
            <p className="text-gray-600 font-medium">Learn how to properly water, fertilize, and maintain your plants.</p>
          </div>
        </Link>

        <Link href="/diy" className="block group">
          <div className="bg-white text-black p-8 rounded-2xl h-full border-4 border-transparent group-hover:border-green-500 transition-all shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-3">🎍 DIY Garden Ideas 🎋</h2>
            <p className="text-gray-600 font-medium">Build your own garden structures and decorations.</p>
          </div>
        </Link>

        <Link href="/methods" className="block group">
          <div className="bg-white text-black p-8 rounded-2xl h-full border-4 border-transparent group-hover:border-green-500 transition-all shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-3">🌱 Gardening Methods 🌳</h2>
            <p className="text-gray-600 font-medium">Explore different gardening techniques and methods.</p>
          </div>
        </Link>

      </div>
    </section>
  );
}