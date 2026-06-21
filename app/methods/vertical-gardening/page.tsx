export default function VerticalGardening() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <img
        src="/methods/vertical.jpg"
        alt="Lush living wall with vertical planters"
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mt-6">
        🪴 Vertical Gardening
      </h1>
      <p className="mt-6 text-lg">
        Maximize your limited garden space with stunning living walls and vertical planters. Vertical gardening is a smart space-saving gardening technique that trains plants to grow upwards, turning bare fences and walls into vibrant, productive greenery.
      </p>
      <h2 className="text-3xl font-bold mt-8">
        Benefits
      </h2>
      <ul className="list-disc ml-8 mt-4 text-lg">
        <li>Drastically increases harvest yields per square foot</li>
        <li>Improves air circulation around plants, preventing disease</li>
        <li>Creates beautiful privacy screens and visual focal points</li>
      </ul>
      <h2 className="text-3xl font-bold mt-8">
        Related Video
      </h2>
      <a
        href="https://youtu.be/gMW99neaPpc?si=zNDgH9arDvChSmzC"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white px-5 py-2 rounded-lg">
          ▶ Watch Tutorial
        </button>
      </a>
    </main>
  );
}