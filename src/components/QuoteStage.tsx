import { useEffect, useState } from "react";
import type { Quote, QuoteSource } from "../lib/types";

interface QuoteStageProps {
  quote: Quote | null;
  source: QuoteSource;
  index: number;
  total: number;
}

export function QuoteStage({ quote, source, index, total }: QuoteStageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, [quote]);

  if (!quote) {
    return (
      <div className="font-display text-decade-fg-muted text-sm">No quotes available.</div>
    );
  }

  return (
    <figure
      className={[
        "mx-auto flex max-w-3xl flex-col items-center gap-6 text-center transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      ].join(" ")}
    >
      <blockquote className="font-display text-decade-fg text-3xl leading-snug sm:text-5xl sm:leading-tight">
        <span aria-hidden className="text-decade-accent pr-1">
          &ldquo;
        </span>
        {quote.quote}
        <span aria-hidden className="text-decade-accent pl-1">
          &rdquo;
        </span>
      </blockquote>
      <figcaption className="flex flex-col items-center gap-1">
        <cite className="text-decade-fg text-lg not-italic tracking-wide sm:text-xl">
          {quote.movie}
          {source === "backend" && (
            <span className="text-decade-fg-muted ml-2 font-mono text-base">
              ({quote.year})
            </span>
          )}
        </cite>
        <div className="font-display text-decade-fg-muted text-xs tracking-[0.3em] uppercase">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </figcaption>
    </figure>
  );
}
