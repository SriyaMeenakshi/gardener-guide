export default function TerraceGardening() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <img
        src="/methods/terracegardening.jpg"
        alt="Lush green rooftop and terrace garden"
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mt-6">
        🏙️ Terrace Gardening
      </h1>
      <p className="mt-6 text-lg">
        Transform your urban space into a lush oasis. Terrace gardening, also known as rooftop gardening, is the perfect solution for urban dwellers looking to maximize limited space, cultivate balcony plants, and enjoy fresh, home-grown produce.
      </p>
      <h2 className="text-3xl font-bold mt-8">
        Benefits
      </h2>
      <ul className="list-disc ml-8 mt-4 text-lg">
        <li>Optimizes small urban spaces for food production</li>
        <li>Reduces indoor temperature through natural rooftop insulation</li>
        <li>Improves local air quality and urban biodiversity</li>
      </ul>
      <h2 className="text-3xl font-bold mt-8">
        Related Video
      </h2>
      <a
        href="https://youtu.be/X0QqhFn8HC8?si=FWtidredgw87uLwn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="mt-4 bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 rounded-lg">
          ▶ Watch Tutorial
        </button>
      </a>
    </main>
  );
}