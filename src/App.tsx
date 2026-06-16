import { useEffect, useState } from "react";
import { ConnectionPill } from "./components/ConnectionPill";
import { DecadeSwitcher } from "./components/DecadeSwitcher";
import { QuoteStage } from "./components/QuoteStage";
import { useQuoteCycle } from "./hooks/useQuoteCycle";
import { useQuotes } from "./hooks/useQuotes";
import { DEFAULT_DECADE, isDecade, type Decade } from "./lib/types";
import { applyDecadeTheme, DECADE_THEMES } from "./theme/decades";

const STORAGE_KEY = "tech-movie-quotes:decade";

function readStoredDecade(): Decade {
  if (typeof window === "undefined") return DEFAULT_DECADE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && isDecade(stored) ? stored : DEFAULT_DECADE;
}

export default function App() {
  const [decade, setDecade] = useState<Decade>(readStoredDecade);
  const { quotes, source, isConnected, quotesPerDecade } = useQuotes(decade);
  const cycle = useQuoteCycle(quotes);

  useEffect(() => {
    applyDecadeTheme(decade);
    window.localStorage.setItem(STORAGE_KEY, decade);
  }, [decade]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 pt-8 sm:px-10 sm:pt-12">
        <div className="font-display text-decade-fg-muted flex items-center justify-between text-xs tracking-[0.3em] uppercase">
          <span>Tech Movie Quotes</span>
          <span aria-hidden>{DECADE_THEMES[decade].label}</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-12 sm:px-10">
        <QuoteStage
          quote={cycle.current}
          source={source}
          index={cycle.index}
          total={cycle.total}
        />
        <div className="flex flex-col items-center gap-4">
          <DecadeSwitcher value={decade} onChange={setDecade} />
          <p className="font-display text-decade-fg-muted text-[10px] tracking-[0.3em] uppercase">
            Use arrow keys to switch decades
          </p>
        </div>
      </main>

      <footer className="px-6 pb-6 sm:px-10">
        <p className="font-display text-decade-fg-muted text-center text-[10px] tracking-[0.3em] uppercase">
          {source === "backend"
            ? `Live catalog: ${quotesPerDecade} quotes per decade`
            : `Local catalog: ${quotesPerDecade} quotes per decade`}
        </p>
      </footer>

      <ConnectionPill isConnected={isConnected} quotesPerDecade={quotesPerDecade} />
    </div>
  );
}
