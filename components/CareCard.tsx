import Link from "next/link";

export default function CareCard({ tip }) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-lg
      p-6
      flex
      flex-col
      min-h-[320px]
      "
    >
      <h2 className="text-2xl font-bold text-green-800">
        {tip.title}
      </h2>
      <div className="text-4xl mb-auto">
        <img src={tip.icon} alt={tip.title} />
      </div>

      <p className="text-gray-700 mt-4 flex-grow">
        {tip.description}
      </p>

      <Link
        href={`/plantcare/${tip.slug}`}
        className="mt-6"
      >
        <button
          className="
          w-full
          bg-green-600
          text-white
          py-3
          rounded-lg
          hover:bg-green-700
          transition
          font-semibold
          "
        >
          Read More →
        </button>
      </Link>
    </div>
  );
}