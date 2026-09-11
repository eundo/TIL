import type { Store } from "@netlify/blobs";

type StatsRecord = {
  dailyVisits: Record<string, number>;
  totalVisits: number;
  updatedAt: string | null;
  recentVisits?: { date: string; ids: string[] };
};
type StatsStore = Pick<Store, "getWithMetadata" | "setJSON">;

const STATS_KEY = "stats";
const RETAIN_DAYS = 45;
const MAX_WRITE_ATTEMPTS = 8;
export const TIME_ZONE = "Asia/Seoul";
export const VISIT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function todayInSeoul(now: Date): string {
  const parts = Object.fromEntries(
    dateFormatter.formatToParts(now).map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function parseStats(value: unknown): StatsRecord {
  if (!value || typeof value !== "object")
    throw new Error("Invalid stats record");
  const input = value as Partial<StatsRecord>;
  if (
    !input.dailyVisits ||
    typeof input.dailyVisits !== "object" ||
    Array.isArray(input.dailyVisits) ||
    !Number.isSafeInteger(input.totalVisits) ||
    input.totalVisits! < 0 ||
    (input.updatedAt !== null &&
      (typeof input.updatedAt !== "string" ||
        !Number.isFinite(Date.parse(input.updatedAt))))
  )
    throw new Error("Invalid stats record");
  for (const [date, count] of Object.entries(input.dailyVisits)) {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isSafeInteger(count) ||
      count < 0
    )
      throw new Error("Invalid daily visit count");
  }
  if (
    input.recentVisits !== undefined &&
    (!input.recentVisits ||
      !/^\d{4}-\d{2}-\d{2}$/.test(input.recentVisits.date) ||
      !Array.isArray(input.recentVisits.ids) ||
      !input.recentVisits.ids.every(
        (id) => typeof id === "string" && VISIT_ID_PATTERN.test(id),
      ))
  )
    throw new Error("Invalid visit deduplication record");
  return {
    dailyVisits: { ...input.dailyVisits },
    totalVisits: input.totalVisits!,
    updatedAt: input.updatedAt!,
    ...(input.recentVisits
      ? {
          recentVisits: {
            date: input.recentVisits.date,
            ids: [...input.recentVisits.ids],
          },
        }
      : {}),
  };
}

export async function readVisitStats(
  store: StatsStore,
  recordVisit: boolean,
  now: () => Date = () => new Date(),
  visitId?: string,
) {
  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt++) {
    // A failed read must never be mistaken for an empty store and overwrite totals.
    const snapshot = await store.getWithMetadata(STATS_KEY, {
      type: "json",
      consistency: "strong",
    });
    const stats: StatsRecord = snapshot
      ? parseStats(snapshot.data)
      : { dailyVisits: {}, totalVisits: 0, updatedAt: null };
    const at = now();
    const today = todayInSeoul(at);
    const recentIds =
      stats.recentVisits?.date === today ? stats.recentVisits.ids : [];
    const alreadyCounted =
      recordVisit && !!visitId && recentIds.includes(visitId);

    if (recordVisit && !alreadyCounted) {
      stats.totalVisits += 1;
      stats.dailyVisits[today] = (stats.dailyVisits[today] ?? 0) + 1;
      stats.dailyVisits = Object.fromEntries(
        Object.entries(stats.dailyVisits)
          .sort(([left], [right]) => right.localeCompare(left))
          .slice(0, RETAIN_DAYS),
      );
      stats.updatedAt = at.toISOString();
      if (visitId)
        stats.recentVisits = { date: today, ids: [...recentIds, visitId] };
      if (
        !Number.isSafeInteger(stats.totalVisits) ||
        !Number.isSafeInteger(stats.dailyVisits[today])
      )
        throw new Error("Visit count overflow");
      if (snapshot && !snapshot.etag) throw new Error("Missing stats version");

      // Compare-and-set retries merge concurrent visitors instead of losing increments.
      const result = await store.setJSON(
        STATS_KEY,
        stats,
        snapshot ? { onlyIfMatch: snapshot.etag } : { onlyIfNew: true },
      );
      if (!result.modified) {
        if (attempt < MAX_WRITE_ATTEMPTS - 1)
          await new Promise((resolve) =>
            setTimeout(resolve, 5 * 2 ** attempt + Math.random() * 10),
          );
        continue;
      }
    }

    return {
      counted: recordVisit && !alreadyCounted,
      alreadyCounted,
      today,
      todayVisits: stats.dailyVisits[today] ?? 0,
      totalVisits: stats.totalVisits,
      updatedAt: stats.updatedAt,
      refreshedAt: at.toISOString(),
      timeZone: TIME_ZONE,
    };
  }
  throw new Error("Stats write conflict");
}
