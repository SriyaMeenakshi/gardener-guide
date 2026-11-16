import { useParams, Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { Loading, ErrorMessage } from "../components/Status";

// Shared template for care guides and gardening methods (both are slug + description + sections).
function Article({ resource, backTo, backLabel }) {
  const { slug } = useParams();
  const { data, loading, error } = useApi(`/${resource}/${encodeURIComponent(slug)}`);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const title = data.title || data.name;
  return (
    <article className="max-w-3xl mx-auto">
      <Link to={backTo} className="text-green-700 underline">
        ← {backLabel}
      </Link>
      {data.image && <img src={data.image} alt={title} className="w-full h-72 object-cover rounded-xl shadow-sm mt-4" />}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mt-8">{title}</h1>
      {data.description && <p className="mt-4 text-lg leading-relaxed text-gray-700">{data.description}</p>}

      {data.sections?.length > 0 ? (
        data.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-2xl font-bold">{s.heading}</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{s.body}</p>
          </section>
        ))
      ) : (
        <p className="mt-8 text-gray-500 italic">The full guide is coming soon.</p>
      )}
    </article>
  );
}

export const CareDetail = () => <Article resource="care" backTo="/plantcare" backLabel="All care tips" />;
export const MethodDetail = () => <Article resource="methods" backTo="/methods" backLabel="All methods" />;
