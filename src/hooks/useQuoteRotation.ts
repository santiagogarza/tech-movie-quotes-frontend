import { useCallback, useEffect, useRef, useState } from "react";
import { DECADES, type Decade, type Quote } from "../lib/types";

const CYCLE_INTERVAL_MS = 7000;

export interface UseQuoteRotationParams {
  decade: Decade;
  setDecade: (decade: Decade) => void;
  catalog: Record<Decade, Quote[]>;
  paused?: boolean;
}

export interface UseQuoteRotationResult {
  current: Quote | null;
  index: number;
  total: number;
  next: () => void;
  prev: () => void;
}

/**
 * Owns the active quote index. Auto-advances every 7 seconds and
 * exposes `next()` / `prev()` for keyboard navigation. Wraps across
 * decades: advancing past the last quote of a decade jumps to the
 * first quote of the next, and going back from the first quote of a
 * decade lands on the last quote of the previous (with the final
 * 2010s -> 70s wrap closing the loop).
 */
export function useQuoteRotation({
  decade,
  setDecade,
  catalog,
  paused = false,
}: UseQuoteRotationParams): UseQuoteRotationResult {
  const [index, setIndex] = useState(0);
  const pendingEndRef = useRef(false);
  const catalogRef = useRef(catalog);

  useEffect(() => {
    catalogRef.current = catalog;
  }, [catalog]);

  const quotes = catalog[decade] ?? [];

  useEffect(() => {
    if (pendingEndRef.current) {
      pendingEndRef.current = false;
      const len = catalogRef.current[decade]?.length ?? 0;
      setIndex(Math.max(len - 1, 0));
    } else {
      setIndex(0);
    }
  }, [decade]);

  useEffect(() => {
    if (quotes.length === 0) return;
    setIndex((current) => (current >= quotes.length ? quotes.length - 1 : current));
  }, [quotes.length]);

  const next = useCallback(() => {
    if (quotes.length === 0) return;
    if (index < quotes.length - 1) {
      setIndex(index + 1);
    } else {
      const di = DECADES.indexOf(decade);
      setDecade(DECADES[(di + 1) % DECADES.length]);
    }
  }, [quotes.length, index, decade, setDecade]);

  const prev = useCallback(() => {
    if (quotes.length === 0) return;
    if (index > 0) {
      setIndex(index - 1);
    } else {
      pendingEndRef.current = true;
      const di = DECADES.indexOf(decade);
      setDecade(DECADES[(di - 1 + DECADES.length) % DECADES.length]);
    }
  }, [quotes.length, index, decade, setDecade]);

  useEffect(() => {
    if (paused || quotes.length === 0) return;
    const timer = setInterval(next, CYCLE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, quotes, next]);

  return {
    current: quotes[index] ?? null,
    index,
    total: quotes.length,
    next,
    prev,
  };
}
