import {getStore} from '@netlify/blobs';
import type {Config} from '@netlify/functions';

type StatsRecord = {
  dailyVisits: Record<string, number>;
  totalVisits: number;
  updatedAt: string | null;
};

const STORE_NAME = 'eundo-site-pulse';
const STATS_KEY = 'stats';
const RETAIN_DAYS = 45;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function todayInSeoul(): string {
  return new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Asia/Seoul',
    year: 'numeric',
  }).format(new Date());
}

function emptyStats(): StatsRecord {
  return {
    dailyVisits: {},
    totalVisits: 0,
    updatedAt: null,
  };
}

function normalizeStats(value: unknown): StatsRecord {
  if (!value || typeof value !== 'object') {
    return emptyStats();
  }

  const input = value as Partial<StatsRecord>;
  const dailyVisits =
    input.dailyVisits && typeof input.dailyVisits === 'object' ? input.dailyVisits : {};

  return {
    dailyVisits: Object.fromEntries(
      Object.entries(dailyVisits).map(([date, count]) => [
        date,
        Number.isFinite(Number(count)) ? Number(count) : 0,
      ]),
    ),
    totalVisits: Number.isFinite(Number(input.totalVisits)) ? Number(input.totalVisits) : 0,
    updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : null,
  };
}

function trimDailyVisits(dailyVisits: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(dailyVisits)
      .sort(([leftDate], [rightDate]) => rightDate.localeCompare(leftDate))
      .slice(0, RETAIN_DAYS),
  );
}

export default async (request: Request): Promise<Response> => {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return jsonResponse({message: 'Method not allowed'}, 405);
  }

  const store = getStore({name: STORE_NAME, consistency: 'strong'});
  const storedStats = await store.get(STATS_KEY, {type: 'json'}).catch(() => null);
  const stats = normalizeStats(storedStats);
  const today = todayInSeoul();
  let counted = false;

  if (request.method === 'POST') {
    stats.totalVisits += 1;
    stats.dailyVisits[today] = (stats.dailyVisits[today] ?? 0) + 1;
    stats.dailyVisits = trimDailyVisits(stats.dailyVisits);
    stats.updatedAt = new Date().toISOString();
    counted = true;

    await store.setJSON(STATS_KEY, stats);
  }

  return jsonResponse({
    counted,
    today,
    todayVisits: stats.dailyVisits[today] ?? 0,
    totalVisits: stats.totalVisits,
    updatedAt: stats.updatedAt,
  });
};

export const config: Config = {
  method: ['GET', 'POST'],
  path: '/api/site-stats',
};
