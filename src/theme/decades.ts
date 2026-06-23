import type { Decade } from "../lib/types";

export interface DecadeTheme {
  label: string;
  bgFrom: string;
  bgVia: string;
  bgTo: string;
  accent: string;
  accentSoft: string;
  fg: string;
  fgMuted: string;
  grid: string;
  fontDisplay: string;
  fontBody: string;
}

export const DECADE_THEMES: Record<Decade, DecadeTheme> = {
  "70s": {
    label: "Seventies",
    bgFrom: "#2a1505",
    bgVia: "#5c2a0a",
    bgTo: "#8a4513",
    accent: "#ffb347",
    accentSoft: "rgba(255, 179, 71, 0.18)",
    fg: "#fff3e0",
    fgMuted: "rgba(255, 243, 224, 0.65)",
    grid: "rgba(255, 179, 71, 0.05)",
    fontDisplay: '"Playfair Display", "Times New Roman", serif',
    fontBody: '"Inter", system-ui, sans-serif',
  },
  "80s": {
    label: "Eighties",
    bgFrom: "#0b0b16",
    bgVia: "#1a0b2e",
    bgTo: "#16213e",
    accent: "#ff00ff",
    accentSoft: "rgba(255, 0, 255, 0.2)",
    fg: "#f5f5ff",
    fgMuted: "rgba(245, 245, 255, 0.6)",
    grid: "rgba(0, 255, 255, 0.08)",
    fontDisplay: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    fontBody: '"Inter", system-ui, sans-serif',
  },
  "90s": {
    label: "Nineties",
    bgFrom: "#000000",
    bgVia: "#031a08",
    bgTo: "#062f10",
    accent: "#39ff14",
    accentSoft: "rgba(57, 255, 20, 0.18)",
    fg: "#d6ffd6",
    fgMuted: "rgba(214, 255, 214, 0.6)",
    grid: "rgba(57, 255, 20, 0.06)",
    fontDisplay: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    fontBody: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
  },
  "2000s": {
    label: "Two-Thousands",
    bgFrom: "#020617",
    bgVia: "#0b2545",
    bgTo: "#134e8a",
    accent: "#7dd3fc",
    accentSoft: "rgba(125, 211, 252, 0.18)",
    fg: "#e0f2fe",
    fgMuted: "rgba(224, 242, 254, 0.6)",
    grid: "rgba(125, 211, 252, 0.06)",
    fontDisplay: '"Inter", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
  },
  "2010s": {
    label: "Twenty-Tens",
    bgFrom: "#0a0e14",
    bgVia: "#14222b",
    bgTo: "#1f3a45",
    accent: "#5eead4",
    accentSoft: "rgba(94, 234, 212, 0.15)",
    fg: "#e6f4f1",
    fgMuted: "rgba(230, 244, 241, 0.55)",
    grid: "rgba(94, 234, 212, 0.05)",
    fontDisplay: '"Inter", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
  },
  "2020s": {
    label: "Twenty-Twenties",
    bgFrom: "#0a0414",
    bgVia: "#1a0f3d",
    bgTo: "#2d1b69",
    accent: "#e879f9",
    accentSoft: "rgba(232, 121, 249, 0.2)",
    fg: "#fae8ff",
    fgMuted: "rgba(250, 232, 255, 0.6)",
    grid: "rgba(232, 121, 249, 0.06)",
    fontDisplay: '"Inter", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
  },
};

export function applyDecadeTheme(decade: Decade): void {
  const theme = DECADE_THEMES[decade];
  const root = document.body;
  root.style.setProperty("--decade-bg-from", theme.bgFrom);
  root.style.setProperty("--decade-bg-via", theme.bgVia);
  root.style.setProperty("--decade-bg-to", theme.bgTo);
  root.style.setProperty("--decade-accent", theme.accent);
  root.style.setProperty("--decade-accent-soft", theme.accentSoft);
  root.style.setProperty("--decade-fg", theme.fg);
  root.style.setProperty("--decade-fg-muted", theme.fgMuted);
  root.style.setProperty("--decade-grid", theme.grid);
  root.style.setProperty("--decade-font-display", theme.fontDisplay);
  root.style.setProperty("--decade-font-body", theme.fontBody);
}
