import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, SearchX, X } from "lucide-react";
import useApi from "../hooks/useApi";
import { PlantCard } from "../components/Cards";
import { PageHeader, CardSkeletons, ErrorMessage } from "../components/Status";
import { CATEGORY, LEVEL, SUN, WATER } from "../lib/labels";

// Filters live in the URL, so a filtered view can be bookmarked or shared.
const FILTERS = [
  { key: "category", placeholder: "All types", options: CATEGORY },
  { key: "sunlight", placeholder: "Any light", options: SUN },
  { key: "water", placeholder: "Any water", options: WATER },
  { key: "difficulty", placeholder: "Any level", options: LEVEL },
];

export default function Plants() {
  const [params, setParams] = useSearchParams();
  const [searchText, setSearchText] = useState(params.get("search") || "");

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: true });
  };

  // Keep the box in sync when the URL changes from outside (Back/Forward, Clear).
  const urlSearch = params.get("search") || "";
  useEffect(() => {
    setSearchText(urlSearch);
  }, [urlSearch]);

  // Debounce typing so we don't hit the API on every keystroke.
  const debounce = useRef();
  useEffect(() => () => clearTimeout(debounce.current), []);
  const onSearchChange = (value) => {
    setSearchText(value);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => setParam("search", value.trim()), 350);
  };

  const query = new URLSearchParams(params);
  query.set("limit", "12");
  const { data, loading, error } = useApi(`/plants?${query}`);
  const page = Number(params.get("page")) || 1;
  const filtered = [...params.keys()].some((k) => k !== "page");

  return (
    <>
      <PageHeader
        eyebrow="Plant guides"
        title="Find the right plant for your garden"
        subtitle="Search by name, or narrow it down by light, water and how easy a plant is to grow."
      />

      <div className="card sticky top-[4.75rem] z-30 mb-8 p-3 md:p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))_auto]">
          <div className="relative">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              type="search"
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plants…"
              aria-label="Search plants"
              className="input !pl-10"
            />
          </div>
          {FILTERS.map(({ key, placeholder, options }) => (
            <select key={key} aria-label={key} value={params.get(key) || ""} onChange={(e) => setParam(key, e.target.value)} className="input">
              <option value="">{placeholder}</option>
              {Object.entries(options).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          ))}
          {filtered && (
            <button
              onClick={() => {
                setSearchText("");
                setParams({}, { replace: true });
              }}
              className="btn btn-outline"
            >
              <X size={15} aria-hidden="true" /> Clear
            </button>
          )}
        </div>
      </div>

      {loading && !data && <CardSkeletons count={6} />}
      {error && <ErrorMessage error={error} />}

      {data && data.plants.length === 0 && (
        <div className="py-20 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-leaf-100 text-leaf-700">
            <SearchX size={26} aria-hidden="true" />
          </div>
          <h2 className="text-2xl">No plants match those filters</h2>
          <p className="mt-2 text-muted">Try removing a filter or searching for something else.</p>
        </div>
      )}

      {data && data.plants.length > 0 && (
        <>
          <p className="mb-5 text-sm text-muted">
            {data.total} {data.total === 1 ? "plant" : "plants"}
          </p>
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-60 transition" : ""}`}>
            {data.plants.map((p) => (
              <PlantCard key={p.slug} plant={p} />
            ))}
          </div>

          {data.pages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Pagination">
              <button disabled={page <= 1} onClick={() => setParam("page", String(page - 1))} className="btn btn-outline">
                <ChevronLeft size={16} aria-hidden="true" /> Previous
              </button>
              <span className="text-sm text-muted">
                Page {page} of {data.pages}
              </span>
              <button disabled={page >= data.pages} onClick={() => setParam("page", String(page + 1))} className="btn btn-outline">
                Next <ChevronRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );
}
