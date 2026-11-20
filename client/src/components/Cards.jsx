import { Link } from "react-router-dom";
import { ArrowRight, Bug, Droplets, Scissors, Shovel, Sprout, Sun, Play, Gauge } from "lucide-react";
import { CATEGORY, LEVEL, SUN, WATER } from "../lib/labels";

const TONES = {
  sun: "bg-sun-100 text-sun-700",
  water: "bg-water-100 text-water-700",
  leaf: "bg-leaf-50 text-leaf-800",
};

export function Pill({ icon: Icon, tone = "leaf", children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]}`}>
      {Icon && <Icon size={13} aria-hidden="true" />}
      {children}
    </span>
  );
}

export function PlantCard({ plant }) {
  return (
    <Link to={`/plants/${plant.slug}`} className="group card card-hover block overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-leaf-100">
        <img src={plant.image} alt={plant.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-leaf-800 shadow-sm backdrop-blur">
          {CATEGORY[plant.category] ?? plant.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl">{plant.name}</h2>
          <ArrowRight size={18} className="shrink-0 text-leaf-400 transition group-hover:translate-x-1 group-hover:text-leaf-700" aria-hidden="true" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Pill icon={Sun} tone="sun">{SUN[plant.sunlight] ?? plant.sunlight}</Pill>
          <Pill icon={Droplets} tone="water">{WATER[plant.water] ?? plant.water}</Pill>
          <Pill icon={Gauge}>{LEVEL[plant.difficulty] ?? plant.difficulty}</Pill>
        </div>
      </div>
    </Link>
  );
}

const CARE_ICONS = { watering: Droplets, sunlight: Sun, soil: Shovel, fertilizer: Sprout, pruning: Scissors, pestcontrol: Bug };

export function CareCard({ tip }) {
  const Icon = CARE_ICONS[tip.slug] ?? Sprout;
  return (
    <Link to={`/plantcare/${tip.slug}`} className="group card card-hover flex flex-col p-6">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-leaf-700 transition group-hover:bg-leaf-600 group-hover:text-white">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-2xl">{tip.title}</h2>
      <p className="mt-2 grow text-muted">{tip.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700">
        Read the guide <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function MethodCard({ method }) {
  return (
    <Link to={`/methods/${method.slug}`} className="group card card-hover relative block aspect-[4/3] overflow-hidden">
      <img src={method.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/85 via-leaf-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
        <h2 className="text-2xl text-white">{method.name}</h2>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/90 text-leaf-800 transition group-hover:bg-white">
          <ArrowRight size={17} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function DIYCard({ project }) {
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group card card-hover flex flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-leaf-100">
        <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 grid place-items-center bg-leaf-950/10 transition group-hover:bg-leaf-950/25">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-leaf-700 shadow-lg transition group-hover:scale-110">
            <Play size={22} className="ml-0.5 fill-current" aria-hidden="true" />
          </span>
        </span>
      </div>
      <div className="p-5">
        <h2 className="text-xl">{project.title}</h2>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700">
          Watch the tutorial <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
