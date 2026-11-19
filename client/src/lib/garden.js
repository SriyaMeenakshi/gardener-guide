const DAY_MS = 24 * 60 * 60 * 1000;

// Local calendar day, so "today" means the user's today and not UTC's.
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

// Whole calendar days from today until `date` (negative = in the past). Math.round absorbs DST's 23/25-hour days.
export const daysFromToday = (date, now = new Date()) => Math.round((startOfDay(new Date(date)) - startOfDay(now)) / DAY_MS);

// Describes when a plant next needs water.
// tone drives the badge colour: "overdue" | "today" | "soon" | "ok"
export function dueInfo(nextWateringAt, now = new Date()) {
  const days = daysFromToday(nextWateringAt, now);
  if (days < 0) return { tone: "overdue", label: days === -1 ? "Overdue by 1 day" : `Overdue by ${-days} days`, days };
  if (days === 0) return { tone: "today", label: "Water today", days };
  if (days === 1) return { tone: "soon", label: "Water tomorrow", days };
  return { tone: "ok", label: `Water in ${days} days`, days };
}

export function lastWateredLabel(lastWateredAt, now = new Date()) {
  if (!lastWateredAt) return "Not watered yet";
  const days = -daysFromToday(lastWateredAt, now);
  if (days <= 0) return "Watered today";
  return days === 1 ? "Watered yesterday" : `Watered ${days} days ago`;
}
