import { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Check, Droplets, Gauge, Leaf, Play, Plus, Sun } from "lucide-react";
import useApi from "../hooks/useApi";
import { apiPost } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Loading, ErrorMessage } from "../components/Status";
import { CATEGORY, LEVEL, SUN, WATER } from "../lib/labels";

function AddToGarden({ plant }) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({ status: "idle", error: "" }); // idle | adding | added

  const add = async () => {
    if (!user) return navigate("/login", { state: { from: location.pathname } });
    setState({ status: "adding", error: "" });
    try {
      await apiPost("/garden", { plantId: plant._id });
      setState({ status: "added", error: "" });
    } catch (err) {
      if (err.status === 401) return logout();
      setState({ status: "idle", error: err.message });
    }
  };

  return (
    <div>
      <button onClick={add} disabled={loading || state.status === "adding"} className="btn btn-primary w-full !py-3">
        {state.status === "added" ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
        {state.status === "adding" ? "Adding…" : state.status === "added" ? "Add another" : "Add to My Garden"}
      </button>
      {state.status === "added" && (
        <p role="status" className="mt-3 text-center text-sm text-leaf-800">
          Added! <Link to="/my-garden" className="font-semibold underline underline-offset-2">View My Garden</Link>
        </p>
      )}
      {state.error && (
        <p role="alert" className="mt-3 text-center text-sm text-clay-700">
          {state.error}
        </p>
      )}
      {!user && !loading && <p className="mt-3 text-center text-xs text-stone-500">Log in to track this plant's watering.</p>}
    </div>
  );
}

function Fact({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}>
        <Icon size={19} aria-hidden="true" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-stone-500">{label}</div>
        <div className="font-medium text-leaf-950">{value}</div>
      </div>
    </div>
  );
}

const SectionTitle = ({ children }) => <h2 className="mb-6 text-2xl md:text-3xl">{children}</h2>;

export default function PlantDetail() {
  const { slug } = useParams();
  const { data: plant, loading, error } = useApi(`/plants/${encodeURIComponent(slug)}`);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const video = plant.video;
  return (
    <article>
      <Link to="/plants" className="inline-flex items-center gap-1.5 text-sm font-medium text-leaf-700 hover:text-leaf-900">
        <ArrowLeft size={16} aria-hidden="true" /> All plants
      </Link>

      <div className="relative isolate mt-4 overflow-hidden rounded-3xl">
        <img src={plant.heroImage || plant.image} alt={plant.name} className="h-72 w-full object-cover md:h-[26rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/85 via-leaf-950/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-leaf-800">{CATEGORY[plant.category] ?? plant.category}</span>
          <h1 className="mt-3 max-w-3xl text-3xl text-white md:text-5xl">{plant.headline || plant.name}</h1>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* At a glance + the main action. First on small screens, a sticky sidebar on large ones. */}
        <aside className="lg:order-2">
          <div className="card space-y-5 p-6 lg:sticky lg:top-24">
            <h2 className="text-xl">At a glance</h2>
            <Fact icon={Sun} label="Sunlight" value={SUN[plant.sunlight] ?? plant.sunlight} tone="bg-sun-100 text-sun-700" />
            <Fact icon={Droplets} label="Water" value={WATER[plant.water] ?? plant.water} tone="bg-water-100 text-water-700" />
            <Fact icon={Gauge} label="Difficulty" value={LEVEL[plant.difficulty] ?? plant.difficulty} tone="bg-leaf-100 text-leaf-700" />
            <div className="border-t border-leaf-100 pt-5">
              <AddToGarden plant={plant} />
            </div>
          </div>
        </aside>

        <div className="min-w-0 lg:order-1">
          {plant.description ? (
            <p className="text-lg leading-relaxed text-ink/90 md:text-xl">{plant.description}</p>
          ) : (
            <p className="italic text-muted">The full growing guide for this plant is coming soon.</p>
          )}

          {plant.extraSections?.map((s) => (
            <section key={s.heading} className="mt-8 rounded-2xl border border-clay-100 bg-clay-50 p-6">
              <h2 className="flex items-start gap-2 text-xl">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-clay-600" aria-hidden="true" /> {s.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-ink/85">{s.body}</p>
            </section>
          ))}

          {plant.varieties?.length > 0 && (
            <section className="mt-14">
              <SectionTitle>Popular varieties</SectionTitle>
              <div className="grid gap-5 sm:grid-cols-2">
                {plant.varieties.map((v) => (
                  <div key={v.name} className="card overflow-hidden">
                    {v.image && <img src={v.image} alt={v.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
                    <div className="p-5">
                      <h3 className="text-lg">{v.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {plant.careRequirements?.length > 0 && (
            <section className="mt-14">
              <SectionTitle>Care requirements</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-3">
                {plant.careRequirements.map((c) => (
                  <div key={c.title} className="rounded-2xl bg-leaf-50 p-5">
                    <h3 className="text-lg">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {plant.commonProblems?.length > 0 && (
            <section className="mt-14">
              <SectionTitle>Common problems and fixes</SectionTitle>
              <ul className="space-y-4">
                {plant.commonProblems.map((p) => (
                  <li key={p.title} className="card border-l-4 !border-l-clay-400 p-5">
                    <h3 className="text-lg">{p.title}</h3>
                    {p.cause && <p className="mt-1 text-sm text-muted">{p.cause}</p>}
                    <p className="mt-3 text-sm leading-relaxed">
                      <span className="font-semibold text-leaf-700">Fix: </span>
                      {p.fix}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {video?.url && (
            <section className="mt-14 overflow-hidden rounded-3xl bg-leaf-900 p-8 text-center md:p-10">
              <Leaf size={26} className="mx-auto text-leaf-400" aria-hidden="true" />
              <h2 className="mt-4 text-2xl text-white md:text-3xl">{video.heading || "Learn by watching"}</h2>
              {video.text && <p className="mx-auto mt-3 max-w-xl text-leaf-100/90">{video.text}</p>}
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-6 !px-6 !py-3">
                <Play size={16} className="fill-current" aria-hidden="true" /> {video.label}
              </a>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
