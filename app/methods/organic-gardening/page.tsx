export default function OrganicGardening() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <img
        src="/methods/organic.jpg"
        alt="Harvesting fresh, chemical-free organic vegetables"
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mt-6">
        🌿 Organic Gardening
      </h1>
      <p className="mt-6 text-lg">
        Embrace chemical-free farming and eco-friendly gardening practices. Organic gardening relies on natural compost, crop rotation, and organic pest control to grow healthy, nutrient-dense fruits and vegetables while protecting the natural ecosystem.
      </p>
      <h2 className="text-3xl font-bold mt-8">
        Benefits
      </h2>
      <ul className="list-disc ml-8 mt-4 text-lg">
        <li>Produces safe, toxic-free food for your family</li>
        <li>Builds healthy, living soil rich in beneficial microbes</li>
        <li>Protects local wildlife, bees, and vital pollinators</li>
      </ul>
      <h2 className="text-3xl font-bold mt-8">
        Related Video
      </h2>
      <a
        href="https://youtu.be/GwCojS5gv70?si=13rwEKvlIVnEWVYo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="mt-4 bg-green-700 hover:bg-green-800 transition-colors text-white px-5 py-2 rounded-lg">
          ▶ Watch Tutorial
        </button>
      </a>
    </main>
  );
}