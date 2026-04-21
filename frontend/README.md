# Glimmora Relocate — Frontend

A premium guided journey for international-move decisions, built as a single
Next.js App Router application.

## Aesthetic direction — "Private Intelligence Dossier"

The UI is deliberately editorial-institutional: think a confidential mobility
briefing issued by a premium advisory firm. No generic SaaS gradients, no
playful chrome.

Signatures:
- **Typography** — Fraunces (variable serif display), IBM Plex Sans (UI),
  IBM Plex Mono (case numbers, metrics).
- **Palette** — warm paper `#F5F2EB`, ink `#131413`, hairline `#E5E0D6`,
  canvas `#FFFFFF`, accent forest-teal `#0E4F48` (sparingly).
- **Details** — "Case №" serialization, small-caps tracked section labels,
  1px hairline rules everywhere, subtle paper grain, Fraunces tabular
  numerals for headline scores.
- **Motion** — fade + gentle stagger on load, nothing flashy.

## Stack

- Next.js 15 (App Router, typed routes)
- React 19, TypeScript strict
- Tailwind CSS with a full design-token layer in `globals.css`
- Radix primitives + custom shadcn-style wrappers in `components/ui/`
- Framer Motion (restrained use in `components/motion/`)
- Lucide icons
- React Hook Form + Zod (profile intake)
- TanStack Query (server state)
- Zustand (assessment flow state, localStorage-persisted)

## Scripts

```bash
pnpm install          # or npm / yarn
pnpm dev              # http://localhost:3000
pnpm build
pnpm typecheck
```

`.env.example` has the relevant variables. With
`NEXT_PUBLIC_USE_MOCK_API=true` the app is fully functional against
`src/lib/api/mock-data.ts` — no backend required.

## Layout

```
src/
├── app/
│   ├── layout.tsx               # fonts, providers, metadata
│   ├── globals.css              # design tokens + base styles + paper grain
│   ├── page.tsx                 # landing
│   ├── (assessment)/            # flow group (stepper + shared layout)
│   │   ├── intent/              # 01 — intent selection
│   │   ├── intake/              # 02 — profile (progressive sections)
│   │   ├── refine/              # 03 — optional refinement
│   │   ├── review/              # 04 — review & confirm
│   │   └── analyzing/           # 05 — live stage tracker
│   └── cases/
│       ├── page.tsx             # case archive / history
│       └── [caseId]/
│           ├── page.tsx         # dossier dashboard
│           ├── jobs/            # detail view
│           ├── relocation/      # detail view
│           ├── financial/       # detail view
│           ├── documents/       # detail view
│           ├── timeline/        # detail view
│           └── cultural/        # detail view
├── components/
│   ├── ui/                      # primitives: button, card, input, select, …
│   ├── brand/                   # wordmark, case-number
│   ├── shell/                   # top-nav, case-sidebar, footer
│   ├── patterns/                # composed: score-ring, stepper, verdict,
│   │                            #          checklist, timeline, …
│   └── motion/                  # fade-in, stagger
├── lib/
│   ├── api/                     # client + typed endpoints + TanStack hooks
│   ├── schemas/                 # Zod schemas (forms)
│   ├── state/                   # Zustand assessment store
│   ├── types/                   # shared TS types (mirror backend)
│   ├── design-tokens.ts
│   ├── formatters.ts            # money, date, score, caseNumber
│   └── utils.ts
└── providers/                   # QueryClientProvider
```

## API contract

The frontend calls the endpoints defined in `src/lib/api/cases.ts` against
`NEXT_PUBLIC_API_BASE_URL`. The module signatures match the backend's
orchestrator pipeline (see `../app/` in the repo root) one-to-one.

All responses follow a consistent `ModuleBase` envelope:
`{ status, score, summary, reasoning, risks, nextActions, metadata, confidence }`.
Errors follow `{ message, code, recoverable, details, fieldErrors }`.

## State layering

| Concern | Where |
|---|---|
| In-flight assessment (intent → review) | `useAssessmentStore` (Zustand, persisted) |
| Server data (cases, modules, progress) | TanStack Query |
| Form state | React Hook Form (per-page) |
| UI state (accordions, selection) | local `useState` |

## Extending

- **New engine** — add a TS type in `lib/types/case.ts`, a fetcher + hook in
  `lib/api/`, a detail page in `app/cases/[caseId]/<engine>/`, and register
  it in `lib/design-tokens.ts::DETAIL_MODULES`.
- **New page in the flow** — create `app/(assessment)/<step>/page.tsx` and
  add it to `ASSESSMENT_STEPS` in `components/patterns/stepper.tsx`.
- **Design tweaks** — every color lives as an HSL token in `globals.css`.
  Change once, propagated everywhere.
