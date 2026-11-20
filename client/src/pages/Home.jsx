import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Flower2, Hammer, Leaf, Sprout, Stethoscope } from "lucide-react";
import useApi from "../hooks/useApi";
import { PlantCard } from "../components/Cards";
import { CardSkeletons } from "../components/Status";

const FEATURES = [
  { to: "/plants", icon: Leaf, title: "Plant guides", text: "Flowers, herbs, kitchen-garden and fruit plants, with care steps and common problems.", tone: "bg-leaf-100 text-leaf-700" },
  { to: "/plantcare", icon: Droplets, title: "Care tips", text: "Watering, light, soil, feeding, pruning and pests, explained simply.", tone: "bg-water-100 text-water-700" },
  { to: "/diy", icon: Hammer, title: "DIY ideas", text: "Bird houses, drip irrigation and more, each with a video tutorial.", tone: "bg-sun-100 text-sun-700" },
  { to: "/methods", icon: Sprout, title: "Gardening methods", text: "Terrace, vertical, organic, hydroponics: find a style that fits your space.", tone: "bg-clay-100 text-clay-700" },
  { to: "/diagnose", icon: Stethoscope, title: "Plant Doctor", text: "Upload a leaf photo and get a suggestion for what might be wrong.", tone: "bg-leaf-100 text-leaf-700" },
  { to: "/my-garden", icon: Flower2, title: "My Garden", text: "Keep track of what you grow and when each plant needs water.", tone: "bg-water-100 text-water-700" },
];

const FEATURED = ["rose", "tomato", "tulasi", "mint"];

function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl">
      <img src="/images/garden-hero.jpg" alt="" fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-leaf-950/90 via-leaf-950/60 to-leaf-950/10" />
      <div className="max-w-2xl px-6 py-20 text-white sm:px-12 md:py-28 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
          <Leaf size={14} aria-hidden="true" /> Free to use · Made for beginners
        </span>
        <h1 className="mt-6 text-5xl text-white md:text-6xl">Grow your dream garden</h1>
        <p className="mt-5 text-lg leading-relaxed text-white/85">
          Discover plants, care tips and DIY ideas. Keep track of your own garden, and ask the Plant Doctor when a leaf looks unwell.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/plants" className="btn btn-primary !px-6 !py-3">
            Explore plants <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link to="/diagnose" className="btn btn-light !px-6 !py-3">
            Try Plant Doctor
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mt-16 md:mt-24" aria-labelledby="explore-heading">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <p className="eyebrow mb-3">Everything in one place</p>
        <h2 id="explore-heading" className="text-3xl md:text-4xl">What would you like to do?</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ to, icon: Icon, title, text, tone }) => (
          <Link key={to} to={to} className="group card card-hover p-6">
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}>
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700">
              Open <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Popular() {
  const { data, loading, error } = useApi("/plants?limit=12");
  if (error) return null; // the rest of the page is still useful without this row
  const plants = data ? FEATURED.map((s) => data.plants.find((p) => p.slug === s)).filter(Boolean) : [];

  return (
    <section className="mt-16 md:mt-24" aria-labelledby="popular-heading">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Start here</p>
          <h2 id="popular-heading" className="text-3xl md:text-4xl">Popular plants</h2>
        </div>
        <Link to="/plants" className="btn btn-outline hidden sm:inline-flex">
          See all plants <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      {loading ? (
        <CardSkeletons count={4} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plants.map((p) => (
            <PlantCard key={p.slug} plant={p} />
          ))}
        </div>
      )}
      <Link to="/plants" className="btn btn-outline mt-6 w-full sm:hidden">
        See all plants
      </Link>
    </section>
  );
}

function Quote() {
  return (
    <section className="mt-16 overflow-hidden rounded-3xl bg-leaf-900 px-6 py-14 text-center md:mt-24 md:py-20">
      <Leaf size={28} className="mx-auto text-leaf-400" aria-hidden="true" />
      <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl italic leading-snug text-leaf-50 md:text-4xl">
        “To plant a garden is to believe in tomorrow.”
      </blockquote>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-leaf-300">Audrey Hepburn</p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Popular />
      <Quote />
    </>
  );
}
