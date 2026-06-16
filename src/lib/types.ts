export const DECADES = ["70s", "80s", "90s", "2000s", "2010s"] as const;

export type Decade = (typeof DECADES)[number];

export const DEFAULT_DECADE: Decade = "90s";

export const CYCLE_INTERVAL_MS = 7000;

export interface Quote {
  quote: string;
  movie: string;
  year: number;
  decade: Decade;
}

export type QuoteSource = "backend" | "local";

export function isDecade(value: string): value is Decade {
  return (DECADES as readonly string[]).includes(value);
}
