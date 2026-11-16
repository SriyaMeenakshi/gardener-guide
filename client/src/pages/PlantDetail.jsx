import { useParams, Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { Loading, ErrorMessage } from "../components/Status";

const Badge = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 text-center">
    <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
    <div className="text-lg font-semibold text-green-800 capitalize">{value}</div>
  </div>
);

export default function PlantDetail() {
  const { slug } = useParams();
  const { data: plant, loading, error } = useApi(`/plants/${encodeURIComponent(slug)}`);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <article>
      <Link to="/plants" className="text-green-700 underline">
        ← All plants
      </Link>
      <img src={plant.image} alt={plant.name} className="w-full h-72 md:h-96 object-cover rounded-xl shadow-sm mt-4" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mt-8">{plant.name}</h1>
      {plant.description ? (
        <p className="mt-4 text-lg leading-relaxed text-gray-700">{plant.description}</p>
      ) : (
        <p className="mt-4 text-gray-500 italic">The full growing guide for this plant is coming soon.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Badge label="Category" value={plant.category} />
        <Badge label="Sunlight" value={plant.sunlight} />
        <Badge label="Water" value={plant.water} />
        <Badge label="Difficulty" value={plant.difficulty} />
      </div>

      {plant.soil && (
        <section className="mt-10 bg-green-50 border border-green-100 rounded-xl p-6">
          <h2 className="text-2xl font-bold">🌱 Soil & Support</h2>
          <p className="mt-2 text-gray-700">{plant.soil}</p>
        </section>
      )}

      {plant.varieties?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-3xl font-bold mb-4">Popular Varieties</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plant.varieties.map((v) => (
              <div key={v.name} className="bg-white rounded-xl p-4 shadow-sm">
                {v.image && <img src={v.image} alt={v.name} loading="lazy" className="w-full h-48 object-cover rounded-lg mb-4" />}
                <h3 className="text-xl font-bold text-green-800">{v.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {plant.commonProblems?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-3xl font-bold mb-4">Common Problems & Solutions</h2>
          <ul className="space-y-4">
            {plant.commonProblems.map((p) => (
              <li key={p.title} className="bg-white p-4 rounded-lg shadow-sm">
                <strong>{p.title}</strong>
                {p.cause && <p className="text-gray-600 mt-1">{p.cause}</p>}
                <p className="mt-1">
                  <span className="text-green-700 font-medium">Solution: </span>
                  {p.fix}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {plant.videoUrl && (
        <a
          href={plant.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-green-800 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition"
        >
          ▶ Watch the {plant.name} growing guide
        </a>
      )}
    </article>
  );
}
