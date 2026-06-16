import { useEffect, useRef, useState } from "react";
import { LOCAL_QUOTES } from "../data/quotes";
import { fetchQuotes, probeBackend } from "../lib/backend";
import type { Decade, Quote, QuoteSource } from "../lib/types";

const PROBE_INTERVAL_MS = 4000;

export interface UseQuotesResult {
  quotes: Quote[];
  source: QuoteSource;
  isConnected: boolean;
  quotesPerDecade: number;
}

/**
 * Returns the active quote catalog for the selected decade.
 *
 * Standalone-first: renders the local baseline immediately, then probes the
 * backend in the background and swaps in the expanded catalog if reachable.
 * Continues polling so the connection state stays accurate during the demo
 * (start the backend mid-session and the indicator flips without reload).
 */
export function useQuotes(decade: Decade): UseQuotesResult {
  const [backendQuotes, setBackendQuotes] = useState<Quote[] | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [quotesPerDecade, setQuotesPerDecade] = useState(LOCAL_QUOTES[decade].length);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function poll(): Promise<void> {
      if (cancelledRef.current) return;
      const health = await probeBackend();
      if (cancelledRef.current) return;

      if (!health) {
        setIsConnected(false);
        setBackendQuotes(null);
        setQuotesPerDecade(LOCAL_QUOTES[decade].length);
      } else {
        setIsConnected(true);
        setQuotesPerDecade(health.quotesPerDecade);
        const payload = await fetchQuotes(decade);
        if (cancelledRef.current) return;
        if (payload) {
          setBackendQuotes(payload.quotes);
          setQuotesPerDecade(payload.count);
        } else {
          setBackendQuotes(null);
        }
      }

      timer = setTimeout(poll, PROBE_INTERVAL_MS);
    }

    void poll();

    return () => {
      cancelledRef.current = true;
      if (timer) clearTimeout(timer);
    };
  }, [decade]);

  const quotes = backendQuotes ?? LOCAL_QUOTES[decade];
  const source: QuoteSource = backendQuotes ? "backend" : "local";

  return {
    quotes,
    source,
    isConnected,
    quotesPerDecade: source === "backend" ? quotesPerDecade : LOCAL_QUOTES[decade].length,
  };
}
