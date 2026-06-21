export default function DripIrrigation() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <img
        src="/methods/dripirrigation.jpg"
        alt="Micro-irrigation system watering plant roots"
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mt-6">
        💧 Drip Irrigation
      </h1>
      <p className="mt-6 text-lg">
        Optimize your garden's water usage with a micro-irrigation system. Drip irrigation delivers water and nutrients directly to the plant's root zone, ensuring efficient watering, massive water conservation, and significantly reduced weed growth.
      </p>
      <h2 className="text-3xl font-bold mt-8">
        Benefits
      </h2>
      <ul className="list-disc ml-8 mt-4 text-lg">
        <li>Minimizes water waste through targeted soil delivery</li>
        <li>Prevents soil erosion and nutrient runoff</li>
        <li>Reduces fungal diseases by keeping plant foliage dry</li>
      </ul>
      <h2 className="text-3xl font-bold mt-8">
        Related Video
      </h2>
      <a
        href="https://youtu.be/RfFPo0jilro?si=vYc7qgqE3xhKszf0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2 rounded-lg">
          ▶ Watch Tutorial
        </button>
      </a>
    </main>
  );
}