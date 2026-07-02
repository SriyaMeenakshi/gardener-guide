import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative text-center py-32 px-6 flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* BACKGROUND IMAGE PLACEHOLDER */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        {/* Replace the src below with your actual image path later (e.g., "/my-garden.jpg") */}
        <img
          src="/images/garden-hero.png" 
          alt="Beautiful Garden Background"
          className="w-full h-full object-cover opacity-200"
        />
        {/* This creates a dark shadow over the image so text is readable */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
          Grow Your Dream Garden 🏡
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          Discover plants, gardening techniques and DIY ideas to keep your mini garden healthy and thriving.
        </p>
        <Link href="/plants">
          <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-900/50">
            Explore the Garden
          </button>
        </Link>
      </div>
    </section>
  );
}