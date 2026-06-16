import { DECADES, isDecade, type Decade, type Quote } from "./types";

const DEFAULT_BACKEND_URL = "http://localhost:8787";
const PROBE_TIMEOUT_MS = 800;
const FETCH_TIMEOUT_MS = 2000;

export function getBackendUrl(): string {
  return (import.meta.env.VITE_BACKEND_URL ?? DEFAULT_BACKEND_URL).replace(/\/$/, "");
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export interface HealthResponse {
  ok: boolean;
  mcp: string;
  decades: Decade[];
  quotesPerDecade: number;
}

export async function probeBackend(): Promise<HealthResponse | null> {
  try {
    const response = await fetchWithTimeout(`${getBackendUrl()}/health`, PROBE_TIMEOUT_MS);
    if (!response.ok) return null;
    const data = (await response.json()) as Partial<HealthResponse> | undefined;
    if (!data || data.ok !== true) return null;
    return {
      ok: true,
      mcp: typeof data.mcp === "string" ? data.mcp : "unknown",
      decades: Array.isArray(data.decades)
        ? data.decades.filter((d): d is Decade => typeof d === "string" && isDecade(d))
        : [...DECADES],
      quotesPerDecade: typeof data.quotesPerDecade === "number" ? data.quotesPerDecade : 15,
    };
  } catch {
    return null;
  }
}

export interface QuotesResponse {
  decade: Decade;
  count: number;
  quotes: Quote[];
}

export async function fetchQuotes(decade: Decade): Promise<QuotesResponse | null> {
  try {
    const response = await fetchWithTimeout(
      `${getBackendUrl()}/quotes/${decade}`,
      FETCH_TIMEOUT_MS,
    );
    if (!response.ok) return null;
    const data = (await response.json()) as Partial<QuotesResponse> | undefined;
    if (!data || !Array.isArray(data.quotes) || data.quotes.length === 0) return null;
    return {
      decade,
      count: typeof data.count === "number" ? data.count : data.quotes.length,
      quotes: data.quotes,
    };
  } catch {
    return null;
  }
}
