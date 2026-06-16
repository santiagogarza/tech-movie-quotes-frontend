import { DECADES, type Decade } from "../lib/types";

interface DecadeSwitcherProps {
  value: Decade;
  onChange: (decade: Decade) => void;
}

export function DecadeSwitcher({ value, onChange }: DecadeSwitcherProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose a decade"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
    >
      {DECADES.map((decade) => {
        const active = decade === value;
        return (
          <button
            key={decade}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(decade)}
            className={[
              "font-display rounded-full border px-4 py-1.5 text-sm tracking-widest transition-all duration-200 sm:text-base",
              active
                ? "border-decade-accent bg-decade-accent-soft text-decade-fg shadow-[0_0_24px_-4px_var(--decade-accent)]"
                : "border-white/15 bg-white/5 text-decade-fg-muted hover:border-white/30 hover:text-decade-fg",
            ].join(" ")}
          >
            {decade}
          </button>
        );
      })}
    </div>
  );
}
