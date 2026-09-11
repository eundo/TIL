import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { getStore } from "@netlify/blobs";
import { BlobsServer } from "@netlify/blobs/server";
import {
  readVisitStats,
  todayInSeoul,
} from "../netlify/functions/_shared/visit-stats.ts";

const noon = () => new Date("2026-09-11T03:00:00.000Z");
const existing = () => ({
  dailyVisits: { "2026-09-10": 3, "2026-09-11": 4 },
  totalVisits: 46,
  updatedAt: "2026-09-11T02:00:00.000Z",
});

function memoryStore(initial = null) {
  let value = structuredClone(initial);
  let version = initial ? 1 : 0;
  const writes = [];
  return {
    get value() {
      return structuredClone(value);
    },
    writes,
    async getWithMetadata(key, options) {
      assert.equal(key, "stats");
      assert.equal(options.consistency, "strong");
      return value === null
        ? null
        : { data: structuredClone(value), etag: String(version), metadata: {} };
    },
    async setJSON(key, next, options) {
      await new Promise((resolve) => setImmediate(resolve));
      writes.push({ key, options });
      if (
        (options.onlyIfNew && value !== null) ||
        (options.onlyIfMatch && options.onlyIfMatch !== String(version))
      )
        return { modified: false };
      assert(
        options.onlyIfNew || options.onlyIfMatch,
        "writes must be conditional",
      );
      value = structuredClone(next);
      version++;
      return { modified: true, etag: String(version) };
    },
  };
}

test("Seoul day changes at 15:00 UTC, including month/year/leap boundaries", () => {
  for (const [instant, expected] of [
    ["2026-09-11T14:59:59.999Z", "2026-09-11"],
    ["2026-09-11T15:00:00.000Z", "2026-09-12"],
    ["2026-09-30T15:00:00.000Z", "2026-10-01"],
    ["2026-12-31T15:00:00.000Z", "2027-01-01"],
    ["2028-02-28T15:00:00.000Z", "2028-02-29"],
  ])
    assert.equal(todayInSeoul(new Date(instant)), expected);
});

test("GET reports the Seoul date and refresh time without changing visits or updatedAt", async () => {
  const store = memoryStore(existing());
  const result = await readVisitStats(store, false, noon);
  assert.equal(result.today, "2026-09-11");
  assert.equal(result.timeZone, "Asia/Seoul");
  assert.equal(result.todayVisits, 4);
  assert.equal(result.totalVisits, 46);
  assert.equal(result.refreshedAt, noon().toISOString());
  assert.equal(result.updatedAt, existing().updatedAt);
  assert.equal(result.counted, false);
  assert.deepEqual(store.value, existing());
  assert.equal(store.writes.length, 0);
});

test("a new Seoul day reads zero for Today while retaining Total and yesterday", async () => {
  const store = memoryStore(existing());
  const result = await readVisitStats(
    store,
    false,
    () => new Date("2026-09-11T15:00:00Z"),
  );
  assert.equal(result.today, "2026-09-12");
  assert.equal(result.todayVisits, 0);
  assert.equal(result.totalVisits, 46);
  assert.deepEqual(store.value, existing());
});

test("a missing store can be read without creating a record", async () => {
  const store = memoryStore();
  const result = await readVisitStats(store, false, noon);
  assert.equal(result.todayVisits, 0);
  assert.equal(result.totalVisits, 0);
  assert.equal(store.value, null);
  assert.equal(store.writes.length, 0);
});

test("the first visit creates stats conditionally", async () => {
  const store = memoryStore();
  const result = await readVisitStats(store, true, noon, randomUUID());
  assert.equal(result.todayVisits, 1);
  assert.equal(result.totalVisits, 1);
  assert.deepEqual(store.writes[0].options, { onlyIfNew: true });
});

test("legacy totals are preserved when adding an identified visitor", async () => {
  const store = memoryStore(existing());
  const id = randomUUID();
  const result = await readVisitStats(store, true, noon, id);
  assert.equal(result.todayVisits, 5);
  assert.equal(result.totalVisits, 47);
  assert.equal(store.value.dailyVisits["2026-09-10"], 3);
  assert.deepEqual(store.value.recentVisits, { date: "2026-09-11", ids: [id] });
  assert.deepEqual(store.writes[0].options, { onlyIfMatch: "1" });
});

test("retries for the same browser/day are idempotent, including a lost response", async () => {
  const store = memoryStore(existing());
  const id = randomUUID();
  await readVisitStats(store, true, noon, id);
  const retry = await readVisitStats(store, true, noon, id);
  assert.equal(retry.counted, false);
  assert.equal(retry.alreadyCounted, true);
  assert.equal(retry.todayVisits, 5);
  assert.equal(retry.totalVisits, 47);
  assert.equal(store.writes.length, 1);
});

test("the same browser counts once again after Seoul midnight", async () => {
  const store = memoryStore(existing());
  const id = randomUUID();
  await readVisitStats(store, true, noon, id);
  const tomorrow = () => new Date("2026-09-11T15:00:00Z");
  const result = await readVisitStats(store, true, tomorrow, id);
  assert.equal(result.todayVisits, 1);
  assert.equal(result.totalVisits, 48);
  assert.equal(store.value.dailyVisits["2026-09-11"], 5);
  assert.deepEqual(store.value.recentVisits, { date: "2026-09-12", ids: [id] });
});

test("concurrent different visitors do not overwrite increments", async () => {
  const store = memoryStore(existing());
  const results = await Promise.all(
    Array.from({ length: 6 }, () =>
      readVisitStats(store, true, noon, randomUUID()),
    ),
  );
  assert(results.every((result) => result.counted));
  assert.equal(store.value.totalVisits, 52);
  assert.equal(store.value.dailyVisits["2026-09-11"], 10);
  assert.equal(store.value.recentVisits.ids.length, 6);
});

test("concurrent same-browser requests increment only once", async () => {
  const store = memoryStore(existing());
  const id = randomUUID();
  const results = await Promise.all(
    Array.from({ length: 6 }, () => readVisitStats(store, true, noon, id)),
  );
  assert.equal(results.filter((result) => result.counted).length, 1);
  assert.equal(store.value.totalVisits, 47);
  assert.equal(store.value.dailyVisits["2026-09-11"], 5);
});

test("storage read errors never reset or write counters", async () => {
  const store = memoryStore(existing());
  store.getWithMetadata = async () => {
    throw new Error("temporary read failure");
  };
  await assert.rejects(
    readVisitStats(store, true, noon),
    /temporary read failure/,
  );
  assert.deepEqual(store.value, existing());
  assert.equal(store.writes.length, 0);
});

test("malformed existing records are not silently replaced with zero", async () => {
  for (const value of [
    {},
    { ...existing(), totalVisits: -1 },
    { ...existing(), dailyVisits: { bad: 1 } },
  ]) {
    const store = memoryStore(value);
    await assert.rejects(readVisitStats(store, true, noon), /Invalid/);
    assert.deepEqual(store.value, value);
    assert.equal(store.writes.length, 0);
  }
});

test("a missing ETag is rejected instead of making an unconditional write", async () => {
  const store = memoryStore(existing());
  store.getWithMetadata = async () => ({ data: existing(), metadata: {} });
  await assert.rejects(
    readVisitStats(store, true, noon),
    /Missing stats version/,
  );
  assert.equal(store.writes.length, 0);
});

test("contention has bounded retries and does not report an uncommitted visit", async () => {
  const store = memoryStore(existing());
  let attempts = 0;
  store.setJSON = async () => {
    attempts++;
    return { modified: false };
  };
  await assert.rejects(
    readVisitStats(store, true, noon),
    /Stats write conflict/,
  );
  assert.equal(attempts, 8);
  assert.deepEqual(store.value, existing());
});

test("retention trims only daily history, not the lifetime total", async () => {
  const dates = Array.from({ length: 60 }, (_, index) =>
    todayInSeoul(new Date(noon().getTime() - index * 86_400_000)),
  );
  const store = memoryStore({
    ...existing(),
    totalVisits: 100,
    dailyVisits: Object.fromEntries(dates.map((date) => [date, 1])),
  });
  const result = await readVisitStats(store, true, noon, randomUUID());
  assert.equal(result.totalVisits, 101);
  assert.equal(Object.keys(store.value.dailyVisits).length, 45);
  assert.equal(store.value.dailyVisits[dates[0]], 2);
  assert.equal(store.value.dailyVisits[dates[59]], undefined);
});

test("the installed Blobs SDK reads, deduplicates, and enforces conditional writes in an isolated local store", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "eundo-stats-test-"));
  const server = new BlobsServer({
    directory,
    token: "local-stats-test-token",
  });
  t.after(async () => {
    await server.stop();
    const resolved = path.resolve(directory);
    assert(resolved.startsWith(path.resolve(tmpdir()) + path.sep));
    assert(path.basename(resolved).startsWith("eundo-stats-test-"));
    await rm(resolved, { recursive: true, force: true });
  });
  const { address } = await server.start();
  const store = getStore({
    name: "eundo-site-pulse",
    siteID: "local-stats-test",
    token: "local-stats-test-token",
    apiURL: address,
    consistency: "strong",
  });
  const id = randomUUID();
  assert.equal((await readVisitStats(store, false, noon)).totalVisits, 0);
  assert.equal((await readVisitStats(store, true, noon, id)).totalVisits, 1);
  assert.equal(
    (await readVisitStats(store, true, noon, id)).alreadyCounted,
    true,
  );
  const read = await readVisitStats(store, false, noon);
  assert.equal(read.todayVisits, 1);
  assert.equal(read.totalVisits, 1);

  // The local emulator omits GET ETags; verify the SDK's write protocol using PUT ETags.
  const created = await store.setJSON(
    "conditional-stats",
    { total: 1 },
    { onlyIfNew: true },
  );
  assert.equal(created.modified, true);
  assert(created.etag);
  assert.equal(
    (
      await store.setJSON(
        "conditional-stats",
        { total: 99 },
        { onlyIfNew: true },
      )
    ).modified,
    false,
  );
  assert.equal(
    (
      await store.setJSON(
        "conditional-stats",
        { total: 99 },
        { onlyIfMatch: "stale-version" },
      )
    ).modified,
    false,
  );
  assert.equal(
    (
      await store.setJSON(
        "conditional-stats",
        { total: 2 },
        { onlyIfMatch: created.etag },
      )
    ).modified,
    true,
  );
  assert.deepEqual(await store.get("conditional-stats", { type: "json" }), {
    total: 2,
  });
});
