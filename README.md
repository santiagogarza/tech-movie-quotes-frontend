# tech-movie-quotes-frontend

A standalone-capable web UI that cycles cheesy tech-movie quotes by decade
(70s, 80s, 90s, 2000s, 2010s, 2020s). The decade picker swaps the visual theme
(neon-grid 80s, lime-on-black 90s hacker terminal, etc.) and the quote
fades from one movie to the next every ~7 seconds.

This is the **frontend** half of a two-repo demo. It runs and looks great
on its own; if the companion backend
[tech-movie-quotes-backend](https://github.com/santiagogarza/tech-movie-quotes-backend)
is also running on `http://localhost:8787`, the catalog expands from
5 quotes per decade to 15 and the film **year** appears next to each
movie title. A small pill in the bottom-right corner tells you which
mode is active.

## What it shows

| Mode | Quotes per decade | Movie title shown | Year shown | Connection pill |
| --- | --- | --- | --- | --- |
| Standalone (no backend) | 5 | yes | no | Hollow dot, "Standalone" |
| Connected (backend running) | 15 | yes | yes | Filled dot, "Connected to backend" |

The frontend probes the backend every few seconds, so you can start
the backend mid-session and watch the pill flip without reloading.

## Prerequisites

- Node 20 or newer
- pnpm (the repo pins `pnpm@9.15.0` via `packageManager`). Enable with
  `corepack enable` if you don't already have it.

## Setup

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:5173>.

## Configuration

Copy `.env.example` to `.env.local` if you want to point at a backend
other than `http://localhost:8787`:

```bash
cp .env.example .env.local
# edit VITE_BACKEND_URL
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_BACKEND_URL` | `http://localhost:8787` | Where the frontend probes for the optional backend |

## Standalone vs. connected

The local catalog lives in [`src/data/quotes.ts`](src/data/quotes.ts) —
5 quotes per decade, 30 total. These are the same quotes the backend
returns as its first 5 per decade, so toggling between standalone and
connected feels continuous. When the backend is reachable, the app
pulls the full 15 per decade and starts showing the release year next
to each movie title.

The pill is the at-a-glance signal:

- **Filled dot, "Connected to backend"** — `/health` succeeded and the
  catalog is the expanded backend version. Hover for the URL and the
  catalog size.
- **Hollow dot, "Standalone"** — the backend isn't reachable. The UI
  silently keeps using the local catalog. Hover for the URL it would
  try.

If the backend dies mid-session, the next probe falls back to local
without breaking the quote cycle.

## Keyboard

- **Left / Right arrows** — switch decade

## Build

```bash
pnpm build       # type-check, then vite build into ./dist
pnpm preview     # serve the production build locally
pnpm typecheck   # type-check only
```

## Cursor cloud agents

This repo includes a [`.cursor/environment.json`](.cursor/environment.json)
that tells a Cursor cloud agent (running locally, in
[modal-pooled-workers](https://github.com/santiagogarza/modal-pooled-workers),
or in Cursor's managed background agents) how to install deps and start
the dev server. There is intentionally **no per-repo Dockerfile**: the
Modal worker image owns the container, and a managed background agent
can use Cursor's default Node image. The `install` and `start` commands
in `environment.json` work in all three runtimes.

## Demo script

1. `pnpm install && pnpm dev` and open <http://localhost:5173>.
2. Notice the bottom-right pill: **Standalone**. 80s neon-grid theme,
   five quotes cycling, no year.
3. Switch decades with the pill buttons (or arrow keys). Each decade
   recolors the entire page and changes the typography.
4. In another terminal, start
   [tech-movie-quotes-backend](https://github.com/santiagogarza/tech-movie-quotes-backend)
   (`pnpm dev` on port 8787).
5. Within ~4 seconds the pill flips to **Connected to backend**, the
   quote pool jumps to 15 per decade, and the year appears under each
   movie title — no reload required.
6. Stop the backend. The pill flips back to **Standalone** without
   interrupting the cycle.
