type VisitStats = {
  counted: boolean;
  alreadyCounted: boolean;
  today: string;
  todayVisits: number;
  totalVisits: number;
  refreshedAt: string;
};

const REFRESH_MS = 30_000;
const STORAGE_PREFIX = "eundo.today.visit-counted.";
const pulse = document.querySelector<HTMLElement>(".site-pulse");
const countedDays = new Set<string>();
let visitId: string | undefined;
let inFlight = false;
let pulseVisible = false;
let timer: number | undefined;

function alreadyCounted(day: string): boolean {
  if (countedDays.has(day)) return true;
  try {
    return localStorage.getItem(STORAGE_PREFIX + day) === "1";
  } catch {
    return false;
  }
}

function rememberVisit(day: string) {
  countedDays.add(day);
  try {
    localStorage.setItem(STORAGE_PREFIX + day, "1");
  } catch {
    // The in-memory record prevents refresh polling from recounting this page.
  }
}

function visitorId(): string {
  const key = "eundo.today.visitor-id";
  try {
    visitId ??= localStorage.getItem(key) ?? undefined;
  } catch {}
  if (
    visitId &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      visitId,
    )
  )
    visitId = undefined;
  visitId ??= crypto.randomUUID();
  try {
    localStorage.setItem(key, visitId);
  } catch {}
  return visitId;
}

async function requestStats(
  method: "GET" | "POST",
  visitId?: string,
): Promise<VisitStats> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch("/api/site-stats", {
      method,
      cache: "no-store",
      signal: controller.signal,
      ...(visitId ? { headers: { "X-Visit-Id": visitId } } : {}),
    });
    if (!response.ok) throw new Error("Visit stats unavailable");
    const stats = (await response.json()) as VisitStats;
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(stats.today) ||
      typeof stats.counted !== "boolean" ||
      !Number.isSafeInteger(stats.todayVisits) ||
      stats.todayVisits < 0 ||
      !Number.isSafeInteger(stats.totalVisits) ||
      stats.totalVisits < 0 ||
      !Number.isFinite(Date.parse(stats.refreshedAt))
    )
      throw new Error("Invalid visit stats response");
    return stats;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function refreshStats() {
  if (!pulse || inFlight || document.hidden || !navigator.onLine) return;
  inFlight = true;
  const update = async () => {
    let stats = await requestStats("GET");
    // The server's Seoul date, not the visitor's clock or locale, controls deduplication.
    if (
      location.hostname === "eundo.today" &&
      !document.hidden &&
      !alreadyCounted(stats.today)
    ) {
      stats = await requestStats("POST", visitorId());
      if (stats.counted || stats.alreadyCounted) rememberVisit(stats.today);
    }
    for (const [name, value] of [
      ["today", stats.todayVisits],
      ["total", stats.totalVisits],
    ] as const)
      pulse.querySelectorAll(`[data-visits="${name}"]`).forEach((element) => {
        element.textContent = new Intl.NumberFormat("ko-KR").format(value);
      });
    pulse.dataset.statsDate = stats.today;
    pulse.dataset.statsRefreshedAt = stats.refreshedAt;
    pulse.dataset.statsState = "current";
    pulse.title = `${stats.today} (Asia/Seoul)`;
  };
  try {
    // Serialize the daily visit check across same-browser tabs when Web Locks is available.
    if (location.hostname === "eundo.today" && navigator.locks)
      await navigator.locks.request("eundo.today.visit-count", update);
    else await update();
  } catch {
    pulse.dataset.statsState = "stale";
    pulse.title = "방문 통계를 갱신하지 못했습니다";
  } finally {
    inFlight = false;
  }
}

function updatePolling() {
  window.clearInterval(timer);
  timer = undefined;
  if (!document.hidden && navigator.onLine && pulseVisible)
    timer = window.setInterval(refreshStats, REFRESH_MS);
}

if (pulse) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      pulseVisible = entry.isIntersecting;
      updatePolling();
      if (pulseVisible) void refreshStats();
    });
    observer.observe(pulse);
  } else {
    pulseVisible = true;
    updatePolling();
  }
  document.addEventListener("visibilitychange", () => {
    updatePolling();
    if (!document.hidden) void refreshStats();
  });
  window.addEventListener("focus", () => void refreshStats());
  window.addEventListener("online", () => {
    updatePolling();
    void refreshStats();
  });
  window.addEventListener("offline", updatePolling);
  window.addEventListener("pagehide", () => window.clearInterval(timer));
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      updatePolling();
      void refreshStats();
    }
  });
  void refreshStats();
}

export {};
