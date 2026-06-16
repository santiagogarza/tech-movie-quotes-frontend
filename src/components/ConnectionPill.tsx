import { getBackendUrl } from "../lib/backend";

interface ConnectionPillProps {
  isConnected: boolean;
  quotesPerDecade: number;
}

export function ConnectionPill({ isConnected, quotesPerDecade }: ConnectionPillProps) {
  const label = isConnected ? "Connected to backend" : "Standalone";
  const tooltip = isConnected
    ? `${quotesPerDecade} quotes per decade from ${getBackendUrl()}`
    : `Standalone mode. Will use ${getBackendUrl()} if reachable.`;

  return (
    <div
      className="font-display fixed right-4 bottom-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs backdrop-blur-sm"
      title={tooltip}
      aria-label={tooltip}
    >
      <span
        aria-hidden
        className={[
          "h-2 w-2 rounded-full border transition-colors duration-300",
          isConnected
            ? "border-decade-accent bg-decade-accent shadow-[0_0_8px_var(--decade-accent)]"
            : "border-white/40 bg-transparent",
        ].join(" ")}
      />
      <span className="text-decade-fg-muted tracking-widest uppercase">{label}</span>
    </div>
  );
}
