import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { PlantCard } from "../components/Cards";
import { PageHeader, Loading, ErrorMessage } from "../components/Status";

const FILTERS = {
  category: ["flowering", "medicinal", "kitchen", "fruit"],
  sunlight: ["low", "partial", "full"],
  water: ["low", "moderate", "high"],
  difficulty: ["easy", "medium", "hard"],
};

const select = "bg-white border border-gray-300 rounded-lg px-3 py-2 capitalize";

export default function Plants() {
  // Filters live in the URL, so a filtered view can be bookmarked or shared.
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

  return (
    <>
      <PageHeader title="🌱 Plants for Your Home Garden" subtitle="Find the perfect plants for your mini garden." />

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <input
          type="search"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search plants…"
          aria-label="Search plants"
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 w-56"
        />
        {Object.entries(FILTERS).map(([key, options]) => (
          <select
            key={key}
            aria-label={key}
            value={params.get(key) || ""}
            onChange={(e) => setParam(key, e.target.value)}
            className={select}
          >
            <option value="">Any {key}</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}
        {[...params.keys()].length > 0 && (
          <button
            onClick={() => {
              setSearchText("");
              setParams({}, { replace: true });
            }}
            className="px-3 py-2 text-green-700 underline"
          >
            Clear
          </button>
        )}
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {data && data.plants.length === 0 && <p className="text-center text-gray-600 py-16">No plants match those filters.</p>}
      {data && data.plants.length > 0 && (
        <>
          <p className="text-sm text-gray-600 mb-4">{data.total} plants</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.plants.map((p) => (
              <PlantCard key={p.slug} plant={p} />
            ))}
          </div>
          {data.pages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page <= 1}
                onClick={() => setParam("page", String(page - 1))}
                className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-40"
              >
                ← Prev
              </button>
              <span>
                Page {page} of {data.pages}
              </span>
              <button
                disabled={page >= data.pages}
                onClick={() => setParam("page", String(page + 1))}
                className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
