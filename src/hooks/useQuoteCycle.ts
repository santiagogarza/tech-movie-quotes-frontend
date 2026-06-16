import { useEffect, useState } from "react";
import type { Quote } from "../lib/types";

const CYCLE_INTERVAL_MS = 7000;

export interface UseQuoteCycleResult {
  current: Quote | null;
  index: number;
  total: number;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  next: () => void;
  prev: () => void;
}

export function useQuoteCycle(quotes: Quote[]): UseQuoteCycleResult {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [quotes]);

  useEffect(() => {
    if (paused || quotes.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, quotes]);

  const next = () => setIndex((prev) => (quotes.length === 0 ? 0 : (prev + 1) % quotes.length));
  const prev = () =>
    setIndex((prev) =>
      quotes.length === 0 ? 0 : (prev - 1 + quotes.length) % quotes.length,
    );

  return {
    current: quotes[index] ?? null,
    index,
    total: quotes.length,
    paused,
    setPaused,
    next,
    prev,
  };
}
