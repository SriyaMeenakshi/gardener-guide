export default function Hydroponics() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <img
        src="/methods/hydroponics.jpg"
        alt="Indoor soil-less hydroponic farming system"
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mt-6">
        🧪 Hydroponics
      </h1>
      <p className="mt-6 text-lg">
        Discover the future of soil-less farming. Hydroponics is an innovative, water-based growing method ideal for indoor gardening and controlled environments, utilizing precise hydroponic nutrient solutions for accelerated plant growth and maximum yield.
      </p>
      <h2 className="text-3xl font-bold mt-8">
        Benefits
      </h2>
      <ul className="list-disc ml-8 mt-4 text-lg">
        <li>Yields up to 30% more produce than traditional soil farming</li>
        <li>Uses 90% less water through closed-loop recycling systems</li>
        <li>Eliminates soil-borne diseases and weeds entirely</li>
      </ul>
      <h2 className="text-3xl font-bold mt-8">
        Related Video
      </h2>
      <a
        href="https://youtu.be/0EklopLQqyk?si=HqPPI8OikFWTRgYO"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="mt-4 bg-teal-600 hover:bg-teal-700 transition-colors text-white px-5 py-2 rounded-lg">
          ▶ Watch Tutorial
        </button>
      </a>
    </main>
  );
}