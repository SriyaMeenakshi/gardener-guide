import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronDown, HelpCircle, Leaf, Loader2, ScanSearch, Sprout, Stethoscope, Trash2, X } from "lucide-react";
import { apiDelete, apiGet, apiPost } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { prepareImage } from "../lib/image";
import { PageHeader, Loading } from "../components/Status";

const MAX_PICK_BYTES = 25 * 1024 * 1024; // refuse absurd files before decoding; real photos are shrunk before upload

const OUTCOME = {
  issue: { icon: ScanSearch, title: "Possible problem found", box: "border-clay-100 bg-clay-50", badge: "bg-clay-100 text-clay-700" },
  healthy: { icon: Leaf, title: "Looks healthy", box: "border-leaf-200 bg-leaf-50", badge: "bg-leaf-100 text-leaf-800" },
  unclear: { icon: HelpCircle, title: "Not sure. Try another photo", box: "border-water-100 bg-water-100/40", badge: "bg-water-100 text-water-700" },
  not_plant: { icon: Sprout, title: "That doesn't look like a plant", box: "border-stone-200 bg-stone-50", badge: "bg-stone-100 text-stone-700" },
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
    <div className="mt-5">
      <h4 className="font-sans text-sm font-semibold uppercase tracking-wide text-leaf-800">{title}</h4>
      <Tag className={`mt-2 space-y-1.5 pl-5 text-ink/85 ${ordered ? "list-decimal" : "list-disc"} marker:text-leaf-500`}>
        {items.map((x) => (
          <li key={x} className="pl-1 leading-relaxed">
            {x}
          </li>
        ))}
      </Tag>
    </div>
  );
}

function ResultCard({ result }) {
  const o = OUTCOME[result.outcome];
  const c = result.condition;
  return (
    <section className={`rounded-3xl border p-6 md:p-8 ${o.box}`} aria-live="polite">
      {result.provider === "mock" && (
        <p role="note" className="mb-5 rounded-xl border border-clay-400/40 bg-clay-100 px-4 py-2.5 text-sm font-medium text-clay-700">
          Demo mode: this result is a placeholder and was NOT produced by analysing your photo.
        </p>
      )}
      <div className="flex items-start gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${o.badge}`}>
          <o.icon size={24} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-2xl">{o.title}</h3>
          {result.plantName && <p className="mt-1 text-muted">Plant: {result.plantName}</p>}
        </div>
      </div>

      {c && (
        <div className="mt-6 rounded-2xl bg-white p-5">
          <p className="flex flex-wrap items-center gap-2 font-display text-xl font-semibold text-leaf-950">
            {c.name}
            <span className="rounded-full bg-leaf-50 px-2.5 py-0.5 font-sans text-xs font-medium text-leaf-800">{KIND[c.kind] || c.kind}</span>
          </p>
          {c.cause && <p className="mt-2 text-ink/80">{c.cause}</p>}
          <List title="What to look for" items={c.symptoms} />
          <List title="What to do" items={c.treatment} ordered />
          <List title="How to prevent it" items={c.prevention} />
        </div>
      )}

      {result.outcome === "unclear" && (
        <div className="mt-6 rounded-2xl bg-white p-5">
          <List title="Tips for a better photo" items={PHOTO_TIPS} />
        </div>
      )}

      {result.observations && <p className="mt-5 text-sm text-muted">What I could see: {result.observations}</p>}
      {result.outcome !== "unclear" && (
        <p className="mt-1.5 text-sm text-muted">
          Confidence: {confidenceWord(result.confidence)} ({Math.round(result.confidence * 100)}%)
        </p>
      )}
      <p className="mt-4 text-xs text-stone-500">{result.disclaimer}</p>
    </section>
  );
}

function HistoryRow({ item, onDelete, busy }) {
  const [open, setOpen] = useState(false);
  const o = OUTCOME[item.outcome];
  const label = item.condition?.name || o.title;
  return (
    <li className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${o.badge}`}>
            <o.icon size={19} aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold text-leaf-950">{label}</p>
            <p className="text-sm text-muted">
              {formatDate(item.createdAt)}
              {item.plantName ? ` · ${item.plantName}` : ""}
              {item.provider === "mock" ? " · demo" : ""}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setOpen((v) => !v)} className="btn btn-outline !px-3.5 !py-1.5" aria-expanded={open}>
            {open ? "Hide" : "View"} <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          <button onClick={() => onDelete(item)} disabled={busy} className="btn btn-danger !px-3.5 !py-1.5" aria-label="Delete this result">
            <Trash2 size={15} aria-hidden="true" /> Delete
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
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(null);
  const [busyId, setBusyId] = useState(null);

  // 401 anywhere means the session ended; ProtectedRoute then sends the user to log in.
  const handleAuth = useCallback(
    (err) => {
      if (err.status === 401) {
        logout();
        return true;
      }
      return false;
    },
    [logout]
  );

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

  // Shared by the file picker and drag-and-drop.
  const acceptFile = (file, inputEl) => {
    setResult(null);
    setError("");
    if (!file) return setPreview(null);
    if (!file.type.startsWith("image/")) {
      if (inputEl) inputEl.value = "";
      return setError("Please choose an image file (JPEG, PNG or WebP).");
    }
    if (file.size > MAX_PICK_BYTES) {
      if (inputEl) inputEl.value = "";
      return setError("That file is too large. Please choose a photo under 25 MB.");
    }
    setPreview({ file, url: URL.createObjectURL(file) });
  };

  const choose = (e) => acceptFile(e.target.files?.[0], e.target);

  const drop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (checking) return;
    acceptFile(e.dataTransfer.files?.[0], null);
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
      <PageHeader eyebrow="Plant Doctor" title="What's wrong with my plant?" subtitle="Upload a photo of a leaf, flower or stem and get a suggestion for what might be going on." />

      <div className="mx-auto max-w-2xl">
        <div className="card p-6 md:p-8">
          <input ref={fileInput} id="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={choose} disabled={checking} className="peer sr-only" />

          {preview ? (
            <div className="overflow-hidden rounded-2xl bg-stone-100">
              <img src={preview.url} alt="Your selected plant photo" className="max-h-96 w-full object-contain" />
            </div>
          ) : (
            <label
              htmlFor="photo"
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={drop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition peer-focus-visible:ring-2 peer-focus-visible:ring-leaf-500 peer-focus-visible:ring-offset-2 ${
                dragging ? "border-leaf-500 bg-leaf-100" : "border-leaf-200 bg-leaf-50/60 hover:border-leaf-400 hover:bg-leaf-50"
              }`}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-100 text-leaf-700">
                <Camera size={26} aria-hidden="true" />
              </span>
              <span className="mt-4 text-lg font-semibold text-leaf-950">Choose a photo</span>
              <span className="mt-1 text-sm text-muted">or drag and drop it here · JPEG, PNG or WebP</span>
            </label>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={check} disabled={!preview || checking} className="btn btn-primary !px-6 !py-3">
              {checking ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Stethoscope size={17} aria-hidden="true" />}
              {checking ? "Checking your plant…" : "Check my plant"}
            </button>
            {preview && !checking && (
              <>
                <label htmlFor="photo" className="btn btn-outline cursor-pointer !py-3">
                  Change photo
                </label>
                <button onClick={reset} className="btn btn-danger !py-3">
                  <X size={16} aria-hidden="true" /> Clear
                </button>
              </>
            )}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            Your photo is shrunk on your device and sent for analysis, then discarded. Only the result is saved to your account.
          </p>

          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">
              {error}
            </p>
          )}
        </div>

        {result && (
          <div className="mt-6">
            <ResultCard result={result} />
          </div>
        )}

        <section className="mt-14">
          <h2 className="mb-5 text-2xl">Your past checks</h2>
          {!history ? (
            <Loading />
          ) : history.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-leaf-200 bg-white/60 px-5 py-8 text-center text-muted">No checks yet. Your results will appear here.</p>
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
