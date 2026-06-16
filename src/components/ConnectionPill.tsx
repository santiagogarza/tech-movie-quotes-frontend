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
      className="flex items-center gap-2"
      title={tooltip}
      aria-label={tooltip}
    >
      <span
        aria-hidden
        className={[
          "h-1.5 w-1.5 rounded-full border transition-colors duration-300",
          isConnected
            ? "border-decade-accent bg-decade-accent shadow-[0_0_8px_var(--decade-accent)]"
            : "border-white/40 bg-transparent",
        ].join(" ")}
      />
      <span>{label}</span>
    </div>
  );
}
