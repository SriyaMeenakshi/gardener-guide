export default function Horticulture() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <img
        src="/methods/horticulture.jpg"
        alt="Vibrant variety of fruits, vegetables, and ornamental plants"
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mt-6">
        🌱 Horticulture
      </h1>
      <p className="mt-6 text-lg">
        Horticulture is the science and art of growing fruits, vegetables, flowers, and ornamental plants. It focuses on sustainable plant cultivation, advanced crop management, and landscape design to improve both commercial agricultural yields and home garden aesthetics.
      </p>
      <h2 className="text-3xl font-bold mt-8">
        Benefits
      </h2>
      <ul className="list-disc ml-8 mt-4 text-lg">
        <li>Improves plant quality and crop yield through advanced cultivation techniques</li>
        <li>Enhances food security and productivity for local and global markets</li>
        <li>Promotes sustainable agriculture and eco-friendly land management</li>
      </ul>
      <h2 className="text-3xl font-bold mt-8">
        Related Video
      </h2>
      <a
        href="https://youtu.be/gajUCaN9MQI?si=g1jDN6b81-oyKrR7"
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