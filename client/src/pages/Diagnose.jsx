import { useCallback, useEffect, useRef, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { prepareImage } from "../lib/image";
import { PageHeader, Loading } from "../components/Status";

const MAX_PICK_BYTES = 25 * 1024 * 1024; // refuse absurd files before decoding; real photos are shrunk before upload

const OUTCOME = {
  issue: { icon: "🔎", title: "Possible problem found", box: "border-amber-300 bg-amber-50" },
  healthy: { icon: "🌿", title: "Looks healthy", box: "border-green-300 bg-green-50" },
  unclear: { icon: "🤔", title: "Not sure. Try another photo", box: "border-sky-300 bg-sky-50" },
  not_plant: { icon: "🪴", title: "That doesn't look like a plant", box: "border-gray-300 bg-gray-50" },
};

const KIND = { pest: "Pest", disease: "Disease", deficiency: "Nutrient problem", environmental: "Growing conditions" };

const confidenceWord = (c) => (c >= 0.8 ? "High" : c >= 0.6 ? "Medium" : "Low");
const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

const PHOTO_TIPS = [
  "Use natural daylight and keep the photo in focus.",
  "Get close to the affected leaf, flower or stem.",
  "Show just one plant, and check the underside of leaves too.",
];

function List({ title, items, ordered }) {
  if (!items?.length) return null;
  const Tag = ordered ? "ol" : "ul";
  return (
    <div className="mt-4">
      <h4 className="font-semibold">{title}</h4>
      <Tag className={`mt-1 space-y-1 text-gray-700 ${ordered ? "list-decimal" : "list-disc"} pl-5`}>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </Tag>
    </div>
  );
}

function ResultCard({ result }) {
  const o = OUTCOME[result.outcome];
  const c = result.condition;
  return (
    <section className={`rounded-xl border-2 p-6 ${o.box}`} aria-live="polite">
      {result.provider === "mock" && (
        <p role="note" className="mb-4 rounded-lg bg-red-100 border border-red-300 text-red-800 px-3 py-2 text-sm font-medium">
          Demo mode: this result is a placeholder and was NOT produced by analysing your photo.
        </p>
      )}
      <h3 className="text-2xl font-bold">
        {o.icon} {o.title}
      </h3>
      {result.plantName && <p className="mt-1 text-gray-700">Plant: {result.plantName}</p>}

      {c && (
        <>
          <p className="mt-3 text-xl font-semibold text-green-900">
            {c.name} <span className="ml-2 align-middle text-xs font-medium bg-white border rounded-full px-2 py-0.5">{KIND[c.kind] || c.kind}</span>
          </p>
          {c.cause && <p className="mt-2 text-gray-700">{c.cause}</p>}
          <List title="What to look for" items={c.symptoms} />
          <List title="What to do" items={c.treatment} ordered />
          <List title="How to prevent it" items={c.prevention} />
        </>
      )}

      {result.outcome === "unclear" && <List title="Tips for a better photo" items={PHOTO_TIPS} />}

      {result.observations && <p className="mt-4 text-sm text-gray-600">What I could see: {result.observations}</p>}
      {result.outcome !== "unclear" && (
        <p className="mt-2 text-sm text-gray-600">
          Confidence: {confidenceWord(result.confidence)} ({Math.round(result.confidence * 100)}%)
        </p>
      )}
      <p className="mt-4 text-xs text-gray-500">{result.disclaimer}</p>
    </section>
  );
}

function HistoryRow({ item, onDelete, busy }) {
  const [open, setOpen] = useState(false);
  const label = item.condition?.name || OUTCOME[item.outcome].title;
  return (
    <li className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">
            {OUTCOME[item.outcome].icon} {label}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(item.createdAt)}
            {item.plantName ? ` · ${item.plantName}` : ""}
            {item.provider === "mock" ? " · demo" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setOpen((v) => !v)} className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm" aria-expanded={open}>
            {open ? "Hide" : "View"}
          </button>
          <button onClick={() => onDelete(item)} disabled={busy} className="px-3 py-1.5 rounded-lg text-red-700 hover:bg-red-50 disabled:opacity-60 text-sm">
            Delete
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-4">
          <ResultCard result={item} />
        </div>
      )}
    </li>
  );
}

export default function Diagnose() {
  const { logout } = useAuth();
  const fileInput = useRef(null);
  const [preview, setPreview] = useState(null); // { file, url }
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(null);
  const [busyId, setBusyId] = useState(null);

  // 401 anywhere means the session ended; ProtectedRoute then sends the user to log in.
  const handleAuth = useCallback((err) => {
    if (err.status === 401) {
      logout();
      return true;
    }
    return false;
  }, [logout]);

  useEffect(() => {
    const controller = new AbortController();
    apiGet("/diagnose/history", { signal: controller.signal })
      .then(setHistory)
      .catch((err) => {
        if (err.name === "AbortError" || handleAuth(err)) return;
        setHistory([]); // the checker still works without history
      });
    return () => controller.abort();
  }, [handleAuth]);

  // Free the preview's object URL when it changes or the page closes.
  useEffect(() => () => preview && URL.revokeObjectURL(preview.url), [preview]);

  const choose = (e) => {
    const file = e.target.files?.[0];
    setResult(null);
    setError("");
    if (!file) return setPreview(null);
    if (!file.type.startsWith("image/")) {
      e.target.value = "";
      return setError("Please choose an image file (JPEG, PNG or WebP).");
    }
    if (file.size > MAX_PICK_BYTES) {
      e.target.value = "";
      return setError("That file is too large. Please choose a photo under 25 MB.");
    }
    setPreview({ file, url: URL.createObjectURL(file) });
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setError("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const check = async () => {
    if (!preview || checking) return;
    setChecking(true);
    setError("");
    setResult(null);
    try {
      const blob = await prepareImage(preview.file);
      const form = new FormData();
      form.append("image", blob, "photo.jpg");
      const res = await apiPost("/diagnose", form);
      setResult(res);
      setHistory((list) => [res, ...(list || [])]);
    } catch (err) {
      if (!handleAuth(err)) setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm("Delete this result from your history?")) return;
    setBusyId(item._id);
    try {
      await apiDelete(`/diagnose/${item._id}`);
      setHistory((list) => list.filter((x) => x._id !== item._id));
      setResult((r) => (r?._id === item._id ? null : r));
    } catch (err) {
      if (!handleAuth(err)) setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader title="🩺 Plant Doctor" subtitle="Upload a photo of a leaf, flower or stem and get a suggestion for what might be wrong." />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <label htmlFor="photo" className="block font-medium mb-2">
            Choose a photo
          </label>
          <input
            ref={fileInput}
            id="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={choose}
            disabled={checking}
            className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-green-700"
          />

          {preview && (
            <img src={preview.url} alt="Your selected plant photo" className="mt-4 w-full max-h-96 object-contain rounded-lg bg-gray-100" />
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={check}
              disabled={!preview || checking}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              {checking ? "Checking your plant…" : "Check my plant"}
            </button>
            {preview && !checking && (
              <button onClick={reset} className="px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50">
                Clear
              </button>
            )}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Your photo is shrunk on your device and sent for analysis, then discarded. Only the result is saved to your account.
          </p>

          {error && (
            <p role="alert" className="mt-4 text-red-700">
              {error}
            </p>
          )}
        </div>

        {result && (
          <div className="mt-6">
            <ResultCard result={result} />
          </div>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your past checks</h2>
          {!history ? (
            <Loading />
          ) : history.length === 0 ? (
            <p className="text-gray-600">No checks yet. Your results will appear here.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((item) => (
                <HistoryRow key={item._id} item={item} onDelete={remove} busy={busyId === item._id} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
