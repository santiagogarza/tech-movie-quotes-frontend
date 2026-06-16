import { useEffect, useState } from "react";
import { ConnectionPill } from "./components/ConnectionPill";
import { DecadeSwitcher } from "./components/DecadeSwitcher";
import { QuoteStage } from "./components/QuoteStage";
import { useCatalog } from "./hooks/useCatalog";
import { useQuoteRotation } from "./hooks/useQuoteRotation";
import { DECADES, DEFAULT_DECADE, isDecade, type Decade } from "./lib/types";
import { applyDecadeTheme } from "./theme/decades";

const STORAGE_KEY = "tech-movie-quotes:decade";

function readStoredDecade(): Decade {
  if (typeof window === "undefined") return DEFAULT_DECADE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && isDecade(stored) ? stored : DEFAULT_DECADE;
}

export default function App() {
  const [decade, setDecade] = useState<Decade>(readStoredDecade);
  const { catalog, source, isConnected, quotesPerDecade } = useCatalog();
  const rotation = useQuoteRotation({ decade, setDecade, catalog });

  useEffect(() => {
    applyDecadeTheme(decade);
    window.localStorage.setItem(STORAGE_KEY, decade);
  }, [decade]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      switch (event.key) {
        case "ArrowRight": {
          event.preventDefault();
          const i = DECADES.indexOf(decade);
          setDecade(DECADES[(i + 1) % DECADES.length]);
          return;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const i = DECADES.indexOf(decade);
          setDecade(DECADES[(i - 1 + DECADES.length) % DECADES.length]);
          return;
        }
        case "ArrowDown": {
          event.preventDefault();
          rotation.next();
          return;
        }
        case "ArrowUp": {
          event.preventDefault();
          rotation.prev();
          return;
        }
        default:
          return;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [decade, rotation]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 pt-8 sm:px-10 sm:pt-12">
        <div className="font-display text-decade-fg-muted flex items-center justify-between text-xs tracking-[0.3em] uppercase">
          <span>Best + Worst Quotes</span>
          <ConnectionPill isConnected={isConnected} quotesPerDecade={quotesPerDecade} />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-12 sm:px-10">
        <QuoteStage
          quote={rotation.current}
          source={source}
          index={rotation.index}
          total={rotation.total}
          cycleKey={`${decade}:${rotation.index}`}
        />
        <DecadeSwitcher value={decade} onChange={setDecade} />
      </main>

      <footer className="px-6 pb-6 sm:px-10">
        <p className="font-display text-decade-fg-muted text-center text-[10px] tracking-[0.3em] uppercase">
          {source === "backend"
            ? `Live catalog: ${quotesPerDecade} quotes per decade`
            : `Local catalog: ${quotesPerDecade} quotes per decade`}
        </p>
      </footer>
    </div>
  );
}
