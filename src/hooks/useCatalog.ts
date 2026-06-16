import { useEffect, useState } from "react";
import { LOCAL_QUOTES } from "../data/quotes";
import { fetchQuotes, probeBackend } from "../lib/backend";
import { DECADES, type Decade, type Quote, type QuoteSource } from "../lib/types";

const PROBE_INTERVAL_MS = 4000;
const LOCAL_QUOTES_PER_DECADE = LOCAL_QUOTES["80s"].length;

export interface UseCatalogResult {
  catalog: Record<Decade, Quote[]>;
  source: QuoteSource;
  isConnected: boolean;
  quotesPerDecade: number;
}

/**
 * Standalone-first catalog: returns the local 5-quotes-per-decade
 * baseline immediately, then polls the optional backend and swaps
 * the full 15-per-decade catalog in if it becomes available.
 *
 * Polls /health every 4s. The full catalog is only re-fetched on a
 * connection-state transition (disconnected -> connected); since the
 * catalog itself is static the steady-state cost is one tiny request
 * every poll interval.
 */
export function useCatalog(): UseCatalogResult {
  const [backendCatalog, setBackendCatalog] = useState<Record<Decade, Quote[]> | null>(null);
  const [quotesPerDecade, setQuotesPerDecade] = useState(LOCAL_QUOTES_PER_DECADE);

  useEffect(() => {
    let cancelled = false;
    let wasConnected = false;

    const tick = async (): Promise<void> => {
      if (cancelled) return;
      const health = await probeBackend();
      if (cancelled) return;

      if (!health) {
        if (wasConnected) {
          setBackendCatalog(null);
          setQuotesPerDecade(LOCAL_QUOTES_PER_DECADE);
        }
        wasConnected = false;
        return;
      }

      if (wasConnected) {
        setQuotesPerDecade(health.quotesPerDecade);
        return;
      }

      const results = await Promise.all(DECADES.map(fetchQuotes));
      if (cancelled) return;
      if (results.every((r): r is NonNullable<typeof r> => r !== null)) {
        const map = {} as Record<Decade, Quote[]>;
        DECADES.forEach((d, i) => {
          map[d] = results[i].quotes;
        });
        setBackendCatalog(map);
        setQuotesPerDecade(health.quotesPerDecade);
        wasConnected = true;
      }
    };

    void tick();
    const id = setInterval(() => void tick(), PROBE_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const catalog = backendCatalog ?? LOCAL_QUOTES;
  const source: QuoteSource = backendCatalog ? "backend" : "local";

  return { catalog, source, isConnected: source === "backend", quotesPerDecade };
}
