import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Check, Droplets, Pencil, Plus, Sprout, Trash2 } from "lucide-react";
import { apiDelete, apiGet, apiPost, apiPut } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { dueInfo, lastWateredLabel } from "../lib/garden";
import { PageHeader, Loading, ErrorMessage } from "../components/Status";
import PlantImage from "../components/PlantImage";

// Watering status badge: colour + icon, never colour alone.
const TONES = {
  overdue: { cls: "bg-clay-50 text-clay-700", icon: AlertCircle },
  today: { cls: "bg-sun-100 text-sun-700", icon: Droplets },
  soon: { cls: "bg-water-100 text-water-700", icon: Droplets },
  ok: { cls: "bg-leaf-100 text-leaf-800", icon: Check },
};

const byDue = (a, b) => new Date(a.nextWateringAt) - new Date(b.nextWateringAt);

function EditForm({ entry, onSave, onCancel, saving }) {
  const [nickname, setNickname] = useState(entry.nickname);
  const [days, setDays] = useState(String(entry.wateringEveryDays));
  const [notes, setNotes] = useState(entry.notes);

  const submit = (e) => {
    e.preventDefault();
    onSave({ nickname, wateringEveryDays: Number(days), notes });
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-3 border-t border-leaf-100 pt-4">
      <div>
        <label htmlFor={`nick-${entry._id}`} className="label">Nickname</label>
        <input id={`nick-${entry._id}`} value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={60} placeholder={entry.plant.name} className="input" />
      </div>
      <div>
        <label htmlFor={`days-${entry._id}`} className="label">Water every (days)</label>
        <input id={`days-${entry._id}`} type="number" min={1} max={60} step={1} required value={days} onChange={(e) => setDays(e.target.value)} className="input" />
      </div>
      <div>
        <label htmlFor={`notes-${entry._id}`} className="label">Notes</label>
        <textarea id={`notes-${entry._id}`} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={3} className="input" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}

function GardenCard({ entry, busy, error, onWater, onSave, onRemove }) {
  const [editing, setEditing] = useState(false);
  const due = dueInfo(entry.nextWateringAt);
  const tone = TONES[due.tone];
  const title = entry.nickname || entry.plant.name;

  return (
    <li className="card flex flex-col overflow-hidden">
      <div className="relative">
        <PlantImage src={entry.plant.image} alt={entry.plant.name} loading="lazy" className="h-44 w-full object-cover" />
        <span className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${tone.cls}`}>
          <tone.icon size={14} aria-hidden="true" /> {due.label}
        </span>
      </div>
      <div className="flex grow flex-col p-5">
        <h2 className="text-xl">{title}</h2>
        {entry.nickname && (
          <Link to={`/plants/${entry.plant.slug}`} className="text-sm text-leaf-700 underline underline-offset-2">
            {entry.plant.name}
          </Link>
        )}

        <p className="mt-3 text-sm text-muted">
          {lastWateredLabel(entry.lastWateredAt)} · every {entry.wateringEveryDays} {entry.wateringEveryDays === 1 ? "day" : "days"}
        </p>
        {entry.notes && <p className="mt-2 whitespace-pre-line rounded-xl bg-leaf-50 p-3 text-sm text-ink/85">{entry.notes}</p>}

        {error && (
          <p role="alert" className="mt-3 text-sm text-clay-700">
            {error}
          </p>
        )}

        {editing ? (
          <EditForm
            entry={entry}
            saving={busy}
            onCancel={() => setEditing(false)}
            onSave={async (changes) => {
              if (await onSave(entry._id, changes)) setEditing(false);
            }}
          />
        ) : (
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
            <button onClick={() => onWater(entry._id)} disabled={busy} className="btn btn-primary !py-2">
              <Droplets size={16} aria-hidden="true" /> Mark watered
            </button>
            <button onClick={() => setEditing(true)} className="btn btn-outline !py-2">
              <Pencil size={15} aria-hidden="true" /> Edit
            </button>
            <button onClick={() => onRemove(entry)} disabled={busy} className="btn btn-danger !py-2 sm:ml-auto" aria-label={`Remove ${title}`}>
              <Trash2 size={15} aria-hidden="true" /> Remove
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className={`card flex-1 px-5 py-4 ${highlight ? "!border-clay-100 !bg-clay-50" : ""}`}>
      <div className={`font-display text-3xl font-semibold ${highlight ? "text-clay-700" : "text-leaf-800"}`}>{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}

export default function MyGarden() {
  const { logout } = useAuth();
  const [items, setItems] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [errors, setErrors] = useState({}); // per-card action errors, keyed by entry id

  useEffect(() => {
    const controller = new AbortController();
    apiGet("/garden", { signal: controller.signal })
      .then(setItems)
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err.status === 401) return logout(); // session expired: ProtectedRoute will send them to log in
        setLoadError(err);
      });
    return () => controller.abort();
  }, [logout]);

  // Runs one mutation for one card with shared busy/error handling. Returns true on success.
  const act = useCallback(
    async (id, fn, apply) => {
      setBusyId(id);
      setErrors((e) => ({ ...e, [id]: "" }));
      try {
        const result = await fn();
        setItems((list) => apply(list, result).sort(byDue));
        return true;
      } catch (err) {
        if (err.status === 401) logout();
        else setErrors((e) => ({ ...e, [id]: err.message }));
        return false;
      } finally {
        setBusyId(null);
      }
    },
    [logout]
  );

  const replace = (list, updated) => list.map((x) => (x._id === updated._id ? updated : x));

  const water = (id) => act(id, () => apiPost(`/garden/${id}/water`), replace);
  const save = (id, changes) => act(id, () => apiPut(`/garden/${id}`, changes), replace);
  const remove = (entry) => {
    if (!window.confirm(`Remove ${entry.nickname || entry.plant.name} from your garden?`)) return;
    act(entry._id, () => apiDelete(`/garden/${entry._id}`), (list) => list.filter((x) => x._id !== entry._id));
  };

  if (loadError) return <ErrorMessage error={loadError} />;
  if (!items) return <Loading />;

  const needWater = items.filter((x) => dueInfo(x.nextWateringAt).days <= 0).length;

  return (
    <>
      <PageHeader
        eyebrow="My Garden"
        title="Your garden"
        subtitle={
          items.length === 0
            ? "You haven't added any plants yet."
            : needWater > 0
              ? `${items.length} ${items.length === 1 ? "plant" : "plants"} · ${needWater} need${needWater === 1 ? "s" : ""} water today or are overdue`
              : `${items.length} ${items.length === 1 ? "plant" : "plants"} · nothing needs water today`
        }
      />

      {items.length === 0 ? (
        <div className="mx-auto max-w-md rounded-3xl border-2 border-dashed border-leaf-200 bg-leaf-50/60 px-6 py-14 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-leaf-100 text-leaf-700">
            <Sprout size={28} aria-hidden="true" />
          </div>
          <h2 className="text-2xl">Start your garden</h2>
          <p className="mt-2 text-muted">Add the plants you grow and we'll show you when each one needs water.</p>
          <Link to="/plants" className="btn btn-primary mt-6">
            <Plus size={16} aria-hidden="true" /> Browse plants
          </Link>
        </div>
      ) : (
        <>
          <div className="mx-auto mb-8 flex max-w-md gap-4">
            <Stat label={items.length === 1 ? "Plant" : "Plants"} value={items.length} />
            <Stat label="Need water" value={needWater} highlight={needWater > 0} />
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((entry) => (
              <GardenCard key={entry._id} entry={entry} busy={busyId === entry._id} error={errors[entry._id]} onWater={water} onSave={save} onRemove={remove} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
