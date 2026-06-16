import { CYCLE_INTERVAL_MS } from "../lib/types";

interface CycleProgressBarProps {
  /**
   * Identity of the current cycle slot. When this changes the bar
   * remounts and the fill animation restarts from zero, keeping the
   * indicator in lock-step with the underlying rotation timer.
   */
  cycleKey: string;
}

export function CycleProgressBar({ cycleKey }: CycleProgressBarProps) {
  return (
    <div
      aria-hidden
      className="cycle-progress-track h-px w-28 overflow-hidden rounded-full bg-white/10"
    >
      <div
        key={cycleKey}
        className="bg-decade-accent h-full origin-left shadow-[0_0_6px_var(--decade-accent)]"
        style={{ animation: `cycle-fill ${CYCLE_INTERVAL_MS}ms linear` }}
      />
    </div>
  );
}
