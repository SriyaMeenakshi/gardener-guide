import { Link } from "react-router-dom";
import { Loader2, SearchX } from "lucide-react";

export function PageHeader({ eyebrow, title, subtitle, align = "center" }) {
  const center = align === "center";
  return (
    <header className={`mb-10 md:mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      {subtitle && <p className="prose-lead mt-4">{subtitle}</p>}
    </header>
  );
}

export function Loading({ label = "Loading…" }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-24 text-muted">
      <Loader2 className="animate-spin text-leaf-600" size={22} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

// Placeholder cards shown while a grid loads, so the page doesn't jump.
export function CardSkeletons({ count = 6 }) {
  return (
    <div role="status" aria-label="Loading" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card animate-pulse overflow-hidden">
          <div className="aspect-[4/3] bg-leaf-100" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-2/3 rounded bg-leaf-100" />
            <div className="h-4 w-1/2 rounded bg-leaf-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorMessage({ error }) {
  const notFound = error?.status === 404;
  return (
    <div role="alert" className="mx-auto max-w-md py-20 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-clay-50 text-clay-600">
        <SearchX size={26} aria-hidden="true" />
      </div>
      <h2 className="text-2xl">{notFound ? "We couldn't find that" : "Something went wrong"}</h2>
      <p className="mt-3 text-muted">{notFound ? error.message : "We couldn't load this right now. If the server was asleep, give it a moment and try again."}</p>
      <Link to="/" className="btn btn-outline mt-6">
        Back to home
      </Link>
    </div>
  );
}

// Renders a list resource (loading / error / empty / items) so pages stay tiny.
export function ListState({ state, children, empty = "Nothing here yet." }) {
  if (state.loading) return <CardSkeletons />;
  if (state.error) return <ErrorMessage error={state.error} />;
  if (!state.data || state.data.length === 0) return <p className="py-16 text-center text-muted">{empty}</p>;
  return children;
}
