import { Link } from "react-router-dom";

const btn = "inline-block mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition";

export function PlantCard({ plant }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <img src={plant.image} alt={plant.name} loading="lazy" className="w-full h-48 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mt-3 text-green-800">{plant.name}</h2>
      <p className="text-sm text-gray-500 mt-1 capitalize">
        {plant.sunlight} sun · {plant.water} water · {plant.difficulty}
      </p>
      <Link to={`/plants/${plant.slug}`} className={btn}>
        Learn More →
      </Link>
    </div>
  );
}

export function CareCard({ tip }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[320px]">
      <h2 className="text-2xl font-bold text-green-800">{tip.title}</h2>
      <div className="mb-auto">
        <img src={tip.icon} alt="" className="w-16 h-16 mt-3" />
      </div>
      <p className="text-gray-700 mt-4 grow">{tip.description}</p>
      <Link
        to={`/plantcare/${tip.slug}`}
        className="mt-6 w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        Read More →
      </Link>
    </div>
  );
}

export function MethodCard({ method }) {
  return (
    <Link to={`/methods/${method.slug}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
        <img src={method.image} alt={method.name} loading="lazy" className="w-full h-48 object-cover" />
        <div className="p-5">
          <h2 className="text-2xl font-bold text-green-800">{method.name}</h2>
        </div>
      </div>
    </Link>
  );
}

export function DIYCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition">
      <div>
        <h2 className="text-2xl font-bold text-green-800">{project.title}</h2>
        <p className="my-4 text-gray-700">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition"
          />
        </a>
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 self-start bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
      >
        ▶ Watch Tutorial
      </a>
    </div>
  );
}
