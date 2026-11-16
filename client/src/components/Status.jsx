import { Link } from "react-router-dom";

export function PageHeader({ title, subtitle }) {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      {subtitle && <p className="mt-4 text-lg md:text-xl text-gray-700">{subtitle}</p>}
    </header>
  );
}

export function Loading() {
  return (
    <p role="status" className="text-center text-gray-600 py-16">
      Loading…
    </p>
  );
}

export function ErrorMessage({ error }) {
  const notFound = error?.status === 404;
  return (
    <div role="alert" className="text-center py-16">
      <p className="text-lg text-red-700">{notFound ? error.message : "Couldn't load this right now. Is the API running?"}</p>
      <Link to="/" className="inline-block mt-4 text-green-700 underline">
        ← Back to home
      </Link>
    </div>
  );
}

// Renders a list resource (loading / error / empty / items) so pages stay tiny.
export function ListState({ state, children, empty = "Nothing here yet." }) {
  if (state.loading) return <Loading />;
  if (state.error) return <ErrorMessage error={state.error} />;
  if (!state.data || state.data.length === 0) return <p className="text-center text-gray-600 py-16">{empty}</p>;
  return children;
}
