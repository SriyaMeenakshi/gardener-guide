import { useParams, Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { Loading, ErrorMessage } from "../components/Status";

function Bullets({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 space-y-2 text-gray-700">
      {items.map((b) => (
        <li key={b} className="flex gap-2">
          <span className="text-green-700">•</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      {item.image && <img src={item.image} alt={item.title} loading="lazy" className="w-full h-56 object-cover rounded-lg mb-4" />}
      <h3 className="text-xl font-bold text-green-800">{item.title}</h3>
      {item.body && <p className="mt-2 text-gray-700 leading-relaxed">{item.body}</p>}
      <Bullets items={item.bullets} />
    </div>
  );
}

function Section({ section }) {
  // Items with images (e.g. "common mistakes") read best two-up; plain items stack.
  const hasImages = section.items?.some((i) => i.image);
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-4">{section.heading}</h2>
      {section.body && <p className="text-gray-700 leading-relaxed">{section.body}</p>}
      <Bullets items={section.bullets} />
      {section.items?.length > 0 && (
        <div className={`mt-4 grid gap-5 ${hasImages ? "md:grid-cols-2" : ""}`}>
          {section.items.map((item) => (
            <Item key={item.title} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function Video({ video }) {
  return (
    <section className="mt-12 bg-green-900 text-white rounded-xl p-8 text-center">
      {video.thumbnail && (
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          <img src={video.thumbnail} alt={video.heading || "Video thumbnail"} loading="lazy" className="w-full max-w-xl mx-auto rounded-lg mb-6 hover:opacity-90 transition" />
        </a>
      )}
      <h2 className="text-3xl font-bold mb-4">{video.heading || "Watch the tutorial"}</h2>
      {video.text && <p className="text-green-100 mb-6 max-w-2xl mx-auto">{video.text}</p>}
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-green-900 hover:bg-green-50 font-bold px-8 py-4 rounded-full transition"
      >
        ▶ {video.label}
      </a>
    </section>
  );
}

// Shared template for care guides and gardening methods (both are long-form, section-based articles).
function Article({ resource, backTo, backLabel }) {
  const { slug } = useParams();
  const { data, loading, error } = useApi(`/${resource}/${encodeURIComponent(slug)}`);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const title = data.title || data.name;
  // Care guides keep a short card blurb in `description` and the long intro in `intro`; methods use `description`.
  const intro = data.intro || data.description;
  const hero = data.heroImage || data.image;

  return (
    <article className="max-w-3xl mx-auto">
      <Link to={backTo} className="text-green-700 underline">
        ← {backLabel}
      </Link>
      {hero && <img src={hero} alt={title} className="w-full h-72 md:h-80 object-cover rounded-xl shadow-sm mt-4" />}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mt-8">{data.headline || title}</h1>
      {intro && <p className="mt-4 text-lg leading-relaxed text-gray-700">{intro}</p>}

      {data.sections?.length > 0 ? (
        data.sections.map((s) => <Section key={s.heading} section={s} />)
      ) : (
        <p className="mt-8 text-gray-500 italic">The full guide is coming soon.</p>
      )}

      {data.video?.url && <Video video={data.video} />}

      {data.related?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">🌿 Keep Learning</h2>
          <div className="flex flex-wrap gap-3">
            {data.related.map((r) => (
              <Link
                key={r.slug}
                to={`${backTo}/${r.slug}`}
                className="bg-white border border-green-200 hover:border-green-500 rounded-lg px-4 py-2 text-green-800 font-medium transition"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export const CareDetail = () => <Article resource="care" backTo="/plantcare" backLabel="All care tips" />;
export const MethodDetail = () => <Article resource="methods" backTo="/methods" backLabel="All methods" />;
