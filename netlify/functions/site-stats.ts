import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import { readVisitStats, VISIT_ID_PATTERN } from "./_shared/visit-stats.ts";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export default async (request: Request): Promise<Response> => {
  if (request.method !== "GET" && request.method !== "POST")
    return jsonResponse({ message: "Method not allowed" }, 405);
  const visitId = request.headers.get("x-visit-id") ?? undefined;
  if (visitId !== undefined && !VISIT_ID_PATTERN.test(visitId))
    return jsonResponse({ message: "Invalid visit identifier" }, 400);

  try {
    const store = getStore({ name: "eundo-site-pulse", consistency: "strong" });
    return jsonResponse(
      await readVisitStats(
        store,
        request.method === "POST",
        undefined,
        visitId,
      ),
    );
  } catch (error) {
    console.error("Visit stats unavailable", error);
    return jsonResponse(
      { message: "Visit stats temporarily unavailable" },
      503,
    );
  }
};

export const config: Config = {
  method: ["GET", "POST"],
  path: "/api/site-stats",
};
