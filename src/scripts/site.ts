const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.open) {
    menu.open = false;
    menu.querySelector("summary")?.focus();
  }
});
document.addEventListener("click", (event) => {
  if (
    menu?.open &&
    event.target instanceof Node &&
    !menu.contains(event.target)
  )
    menu.open = false;
});

async function loadStats() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const key = `eundo.today.visit-counted.${today}`;
  let counted = false;
  try {
    counted = localStorage.getItem(key) === "1";
  } catch {}
  const shouldCount = !counted && location.hostname === "eundo.today";
  try {
    const response = await fetch("/api/site-stats", {
      method: shouldCount ? "POST" : "GET",
    });
    if (!response.ok) return;
    const stats = await response.json();
    if (shouldCount) {
      try {
        localStorage.setItem(key, "1");
      } catch {}
    }
    for (const [name, value] of [
      ["today", stats.todayVisits],
      ["total", stats.totalVisits],
    ] as const) {
      if (!Number.isFinite(value)) continue;
      document
        .querySelectorAll(`[data-visits="${name}"]`)
        .forEach((element) => {
          element.textContent = new Intl.NumberFormat("ko-KR").format(value);
        });
    }
  } catch {
    /* Static previews may not expose Netlify Functions. */
  }
}
loadStats();

if (location.hostname === "eundo.today") {
  const analytics = document.createElement("script");
  analytics.async = true;
  analytics.src = "https://www.googletagmanager.com/gtag/js?id=G-VG06L597YE";
  document.head.append(analytics);
  const analyticsWindow = window as Window & { dataLayer?: unknown[] };
  analyticsWindow.dataLayer ??= [];
  function gtag(..._args: unknown[]) {
    analyticsWindow.dataLayer!.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-VG06L597YE", { anonymize_ip: true });
}

const copyTemplate = document.querySelector<HTMLTemplateElement>(
  "#code-copy-template",
);
if (copyTemplate) {
  for (const pre of document.querySelectorAll(".prose pre")) {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.before(wrapper);
    wrapper.append(pre, copyTemplate.content.cloneNode(true));
  }
}
for (const button of document.querySelectorAll<HTMLButtonElement>(
  "[data-copy-code]",
)) {
  button.addEventListener("click", async () => {
    const code = button.parentElement?.querySelector("code")?.textContent;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      button.setAttribute("aria-label", "복사 완료");
      button.title = "복사 완료";
      window.setTimeout(() => {
        button.setAttribute("aria-label", "코드 복사");
        button.title = "코드 복사";
      }, 2000);
    } catch {
      button.title = "복사하지 못했습니다";
    }
  });
}
