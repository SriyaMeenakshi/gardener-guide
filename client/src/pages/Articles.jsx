import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Leaf, Play } from "lucide-react";
import useApi from "../hooks/useApi";
import { Loading, ErrorMessage } from "../components/Status";

function Bullets({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex gap-3 leading-relaxed text-ink/85">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" aria-hidden="true" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <div className="card overflow-hidden">
      {item.image && <img src={item.image} alt={item.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />}
      <div className="p-5">
        <h3 className="text-lg">{item.title}</h3>
        {item.body && <p className="mt-2 leading-relaxed text-ink/85">{item.body}</p>}
        <Bullets items={item.bullets} />
      </div>
    </div>
  );
}

function Section({ section }) {
  // Items with images (e.g. "common mistakes") read best two-up; plain items stack.
  const hasImages = section.items?.some((i) => i.image);
  return (
    <section className="mt-14">
      <h2 className="text-2xl md:text-3xl">{section.heading}</h2>
      {section.body && <p className="mt-4 text-lg leading-relaxed text-ink/85">{section.body}</p>}
      <Bullets items={section.bullets} />
      {section.items?.length > 0 && (
        <div className={`mt-6 grid gap-5 ${hasImages ? "md:grid-cols-2" : ""}`}>
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
    <section className="mt-14 overflow-hidden rounded-3xl bg-leaf-900 p-8 text-center md:p-10">
      {video.thumbnail ? (
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="group relative mx-auto mb-6 block max-w-xl overflow-hidden rounded-2xl">
          <img src={video.thumbnail} alt={video.heading || "Video thumbnail"} loading="lazy" className="w-full transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center bg-leaf-950/20">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-leaf-700 shadow-lg">
              <Play size={22} className="ml-0.5 fill-current" aria-hidden="true" />
            </span>
          </span>
        </a>
      ) : (
        <Leaf size={26} className="mx-auto text-leaf-400" aria-hidden="true" />
      )}
      <h2 className="mt-3 text-2xl text-white md:text-3xl">{video.heading || "Watch the tutorial"}</h2>
      {video.text && <p className="mx-auto mt-3 max-w-xl text-leaf-100/90">{video.text}</p>}
      <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-6 !px-6 !py-3">
        <Play size={16} className="fill-current" aria-hidden="true" /> {video.label}
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
    <article className="mx-auto max-w-3xl">
      <Link to={backTo} className="inline-flex items-center gap-1.5 text-sm font-medium text-leaf-700 hover:text-leaf-900">
        <ArrowLeft size={16} aria-hidden="true" /> {backLabel}
      </Link>
      {hero && <img src={hero} alt={title} className="mt-4 h-64 w-full rounded-3xl object-cover md:h-80" />}
      <h1 className="mt-8 text-4xl md:text-5xl">{data.headline || title}</h1>
      {intro && <p className="prose-lead mt-5 !text-xl">{intro}</p>}

      {data.sections?.length > 0 ? (
        data.sections.map((s) => <Section key={s.heading} section={s} />)
      ) : (
        <p className="mt-10 italic text-muted">The full guide is coming soon.</p>
      )}

      {data.video?.url && <Video video={data.video} />}

      {data.related?.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl">Keep learning</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {data.related.map((r) => (
              <Link key={r.slug} to={`${backTo}/${r.slug}`} className="btn btn-outline">
                {r.label} <ArrowRight size={15} aria-hidden="true" />
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
