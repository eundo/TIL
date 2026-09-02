import {getStore} from '@netlify/blobs';
import type {Config, Context} from '@netlify/functions';
import {createHash, randomUUID} from 'node:crypto';

type GuestbookEntry = {
  createdAt: string;
  id: string;
  message: string;
  name: string;
};

type RateLimitRecord = {
  lastAt: number;
};

const STORE_NAME = 'eundo-guestbook';
const ENTRIES_KEY = 'entries';
const MAX_ENTRIES = 80;
const PUBLIC_LIMIT = 30;
const RATE_WINDOW_MS = 45_000;

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

function cleanText(value: unknown, maxLength: number): string {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function hasLink(text: string): boolean {
  return /(https?:\/\/|www\.|\.com\b|\.net\b|\.io\b|\.kr\b|\.dev\b)/i.test(text);
}

function normalizeEntries(value: unknown): GuestbookEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }

      const input = entry as Partial<GuestbookEntry>;
      const createdAt =
        typeof input.createdAt === 'string' && Number.isFinite(Date.parse(input.createdAt))
          ? input.createdAt
          : null;
      const id = typeof input.id === 'string' && input.id ? input.id : null;
      const name = cleanText(input.name, 24);
      const message = cleanText(input.message, 240);

      if (!id || !createdAt || !name || !message) {
        return null;
      }

      return {createdAt, id, message, name};
    })
    .filter((entry): entry is GuestbookEntry => Boolean(entry))
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .slice(0, MAX_ENTRIES);
}

function publicEntries(entries: GuestbookEntry[]): GuestbookEntry[] {
  return entries.slice(0, PUBLIC_LIMIT);
}

function getClientHash(request: Request, context: Context): string {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const clientIp = context.ip ?? forwardedFor ?? 'local';

  return createHash('sha256')
    .update(`${todayInSeoul()}:${clientIp}:${userAgent}`)
    .digest('hex')
    .slice(0, 32);
}

async function isRateLimited(
  store: ReturnType<typeof getStore>,
  request: Request,
  context: Context,
): Promise<boolean> {
  const key = `rate/${todayInSeoul()}/${getClientHash(request, context)}`;
  const now = Date.now();
  const rateRecord = (await store.get(key, {type: 'json'}).catch(() => null)) as
    | RateLimitRecord
    | null;

  if (rateRecord?.lastAt && now - rateRecord.lastAt < RATE_WINDOW_MS) {
    return true;
  }

  await store.setJSON(key, {lastAt: now});

  return false;
}

export default async (request: Request, context: Context): Promise<Response> => {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return jsonResponse({message: 'Method not allowed'}, 405);
  }

  const store = getStore({name: STORE_NAME, consistency: 'strong'});
  const storedEntries = await store.get(ENTRIES_KEY, {type: 'json'}).catch(() => null);
  const entries = normalizeEntries(storedEntries);

  if (request.method === 'GET') {
    return jsonResponse({
      count: entries.length,
      entries: publicEntries(entries),
    });
  }

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({message: '내용을 읽지 못했습니다.'}, 400);
  }

  if (cleanText(payload.website, 80)) {
    return jsonResponse({
      accepted: true,
      count: entries.length,
      entries: publicEntries(entries),
    });
  }

  const name = cleanText(payload.name, 24);
  const message = cleanText(payload.message, 240);

  if (name.length < 1 || message.length < 2) {
    return jsonResponse({message: '이름과 메시지를 조금만 더 적어주세요.'}, 400);
  }

  if (hasLink(`${name} ${message}`)) {
    return jsonResponse({message: '방명록에는 링크를 남길 수 없습니다.'}, 400);
  }

  if (await isRateLimited(store, request, context)) {
    return jsonResponse({message: '조금 뒤에 다시 남겨주세요.'}, 429);
  }

  const entry: GuestbookEntry = {
    createdAt: new Date().toISOString(),
    id: randomUUID(),
    message,
    name,
  };
  const nextEntries = [entry, ...entries].slice(0, MAX_ENTRIES);

  await store.setJSON(ENTRIES_KEY, nextEntries);

  return jsonResponse({
    accepted: true,
    count: nextEntries.length,
    entries: publicEntries(nextEntries),
  });
};

export const config: Config = {
  method: ['GET', 'POST'],
  path: '/api/guestbook',
};
