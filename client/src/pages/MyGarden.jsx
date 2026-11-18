import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDelete, apiGet, apiPost, apiPut } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { dueInfo, lastWateredLabel } from "../lib/garden";
import { PageHeader, Loading, ErrorMessage } from "../components/Status";

const TONES = {
  overdue: "bg-red-100 text-red-800 border-red-300",
  today: "bg-amber-100 text-amber-800 border-amber-300",
  soon: "bg-sky-100 text-sky-800 border-sky-300",
  ok: "bg-green-100 text-green-800 border-green-300",
};

const byDue = (a, b) => new Date(a.nextWateringAt) - new Date(b.nextWateringAt);
const inputClass = "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500";

function EditForm({ entry, onSave, onCancel, saving }) {
  const [nickname, setNickname] = useState(entry.nickname);
  const [days, setDays] = useState(String(entry.wateringEveryDays));
  const [notes, setNotes] = useState(entry.notes);

  const submit = (e) => {
    e.preventDefault();
    onSave({ nickname, wateringEveryDays: Number(days), notes });
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-3 border-t pt-4">
      <div>
        <label htmlFor={`nick-${entry._id}`} className="block text-sm font-medium mb-1">Nickname</label>
        <input id={`nick-${entry._id}`} value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={60} placeholder={entry.plant.name} className={inputClass} />
      </div>
      <div>
        <label htmlFor={`days-${entry._id}`} className="block text-sm font-medium mb-1">Water every (days)</label>
        <input id={`days-${entry._id}`} type="number" min={1} max={60} step={1} required value={days} onChange={(e) => setDays(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor={`notes-${entry._id}`} className="block text-sm font-medium mb-1">Notes</label>
        <textarea id={`notes-${entry._id}`} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={3} className={inputClass} />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-lg">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
}

function GardenCard({ entry, busy, error, onWater, onSave, onRemove }) {
  const [editing, setEditing] = useState(false);
  const due = dueInfo(entry.nextWateringAt);
  const title = entry.nickname || entry.plant.name;

  return (
    <li className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img src={entry.plant.image} alt={entry.plant.name} loading="lazy" className="w-full h-40 object-cover" />
      <div className="p-5 flex flex-col grow">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-green-800">{title}</h2>
            {entry.nickname && (
              <Link to={`/plants/${entry.plant.slug}`} className="text-sm text-gray-500 underline">
                {entry.plant.name}
              </Link>
            )}
          </div>
          <span className={`shrink-0 text-sm font-semibold border rounded-full px-3 py-1 ${TONES[due.tone]}`}>{due.label}</span>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          {lastWateredLabel(entry.lastWateredAt)} · every {entry.wateringEveryDays} {entry.wateringEveryDays === 1 ? "day" : "days"}
        </p>
        {entry.notes && <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{entry.notes}</p>}

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
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
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onWater(entry._id)}
              disabled={busy}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-lg"
            >
              💧 Mark watered
            </button>
            <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              Edit
            </button>
            <button onClick={() => onRemove(entry)} disabled={busy} className="px-4 py-2 rounded-lg text-red-700 hover:bg-red-50 disabled:opacity-60">
              Remove
            </button>
          </div>
        )}
      </div>
    </li>
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
        title="🪴 My Garden"
        subtitle={
          items.length === 0
            ? "You haven't added any plants yet."
            : needWater > 0
              ? `${items.length} ${items.length === 1 ? "plant" : "plants"} · ${needWater} need${needWater === 1 ? "s" : ""} water today or are overdue`
              : `${items.length} ${items.length === 1 ? "plant" : "plants"} · nothing needs water today`
        }
      />

      {items.length === 0 ? (
        <div className="text-center py-10">
          <Link to="/plants" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg">
            Browse plants to add
          </Link>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((entry) => (
            <GardenCard
              key={entry._id}
              entry={entry}
              busy={busyId === entry._id}
              error={errors[entry._id]}
              onWater={water}
              onSave={save}
              onRemove={remove}
            />
          ))}
        </ul>
      )}
    </>
  );
}
