import { Link } from "react-router-dom";
import { Heart, Leaf } from "lucide-react";

const explore = [
  { to: "/plants", label: "Plants" },
  { to: "/plantcare", label: "Care tips" },
  { to: "/diy", label: "DIY projects" },
  { to: "/methods", label: "Gardening methods" },
];
const you = [
  { to: "/diagnose", label: "Plant Doctor" },
  { to: "/my-garden", label: "My Garden" },
  { to: "/login", label: "Log in" },
];

function Column({ title, items }) {
  return (
    <div>
      <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-leaf-700">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="text-sm text-stone-600 transition hover:text-leaf-700">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-leaf-100 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-display text-lg font-semibold text-leaf-950">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-leaf-600 text-white">
              <Leaf size={17} aria-hidden="true" />
            </span>
            Gardener Guide
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Inspired by a childhood spent in the garden. Plant guides, a personal garden tracker and a plant-health checker, made to help beginners enjoy growing things.
          </p>
        </div>
        <Column title="Explore" items={explore} />
        <Column title="Your garden" items={you} />
      </div>
      <div className="border-t border-leaf-100">
        <p className="container-page flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} Gardener Guide</span>
          <span className="inline-flex items-center gap-1">
            Brought to life by Sriya Meenakshi <Heart size={12} className="fill-clay-500 text-clay-500" aria-hidden="true" />
          </span>
        </p>
      </div>
    </footer>
  );
}
