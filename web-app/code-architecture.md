# Code Architecture

## Feature: Open Narrator Landing Page

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties (`globals.css`)
- **Fonts**: Rajdhani (headings via `--font-rajdhani`), Inter (UI/body via `--font-inter`)
- **Backend**: Supabase (beta signups)
- **Notifications**: `react-hot-toast`
- **Icons**: `react-icons`

---

### File Structure

```
web-app/
├── app/
│   ├── page.tsx              — Root page, composes all sections ("use client")
│   ├── layout.tsx            — Root layout: metadata, fonts, JSON-LD, Toaster
│   ├── globals.css           — CSS variables (design tokens) + Tailwind import
│   ├── manifest.ts           — PWA manifest
│   ├── opengraph-image.tsx   — OG image generation
│   ├── sitemap.ts            — Sitemap generation
│   └── api/
│       └── voices/
│           ├── route.ts          — GET /api/voices → list of sample voice names
│           └── [name]/route.ts   — GET /api/voices/:name → streams WAV file
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx            — Sticky nav, hamburger mobile menu, CTA
│   │   └── Navbar.module.css     — Scoped CSS for responsive nav layout
│   ├── elements/               — Stateless, reusable UI primitives
│   │   ├── Button.tsx            — primary/secondary button with hover glow
│   │   ├── Badge.tsx             — pill badge for feature highlights
│   │   ├── Input.tsx             — controlled text/email input
│   │   ├── Select.tsx            — controlled dropdown
│   │   ├── FeatureCard.tsx       — icon + title + bullet list card
│   │   ├── HalftoneBackground.tsx — canvas-rendered animated halftone dots
│   │   └── VoiceCard.tsx         — playable voice sample card with progress bar
│   ├── HeroSection.tsx       — Headline, tagline, CTAs, badges, halftone bg, demo trigger
│   ├── VoiceDemo.tsx         — Full-screen modal with playable voice samples
│   ├── FeaturesSection.tsx   — 4-column grid of FeatureCards
│   ├── VideoSection.tsx      — Video creation suite highlight with use case grid
│   ├── PricingBlock.tsx      — Three-tier lifetime pricing (Base/Standard/Pro)
│   ├── BetaSection.tsx       — Beta signup form → Supabase
│   ├── CommunitySection.tsx  — Social platform links (Twitter, Discord, Reddit, Instagram)
│   └── Footer.tsx            — Branding, nav links, contact info
├── services/
│   ├── supabase.ts           — Supabase client initialisation
│   └── betaSignup.service.ts — submitBetaSignup() → inserts into open_narrator_beta_use
└── Sample_Voices/            — Static WAV files served via /api/voices/:name
    └── *.wav                 — 14 sample voices (af_*, am_*, bm_*, hf_* prefixes)
```

---

### Component Details

#### Elements (`/components/elements/`) — stateless UI primitives

| Component | Description |
|---|---|
| `Button` | `primary` / `secondary` variants; supports `disabled`, `type="submit"`, custom `className` |
| `Badge` | Pill badge with icon + text; used in HeroSection highlights |
| `Input` | Controlled text/email input with visible label |
| `Select` | Controlled dropdown with visible label and option list |
| `FeatureCard` | Icon + title + bullet list; used in FeaturesSection grid |
| `HalftoneBackground` | Canvas-rendered radial halftone dot grid with breathing animation (RAF loop) |
| `VoiceCard` | Play/pause button, waveform progress bar, elapsed/total time; audio driven by `<audio>` ref |

#### Sections (`/components/`)

| Component | `"use client"` | Description |
|---|---|---|
| `Navbar` | ✅ | Sticky header; desktop nav links + CTA; mobile hamburger dropdown at `<768px` via `Navbar.module.css` |
| `HeroSection` | ✅ | Logo lockup, tagline, subheadline, two CTAs (scroll-to-beta + open VoiceDemo modal), 4 highlight badges, `HalftoneBackground` |
| `VoiceDemo` | ✅ | Full-screen modal; fetches `/api/voices` on open; renders `VoiceCard` grid; single-active-voice state; Escape key + backdrop close; body scroll lock |
| `FeaturesSection` | — | 4-column responsive grid of `FeatureCard` (Natural Voice, Parallel Processing, Group Speaking, Inbuilt Editor) |
| `VideoSection` | — | Two-column layout: copy + use-case grid (Social media, Product videos, Audiobooks, Marketing); video editor preview placeholder |
| `PricingBlock` | ✅ | Three plans (Base/Standard/Pro); Base is active (free beta), Standard and Pro are disabled/greyed out; all CTAs scroll to `#beta` |
| `BetaSection` | ✅ | Controlled form (name, occupation, useCase, email); submits via `submitBetaSignup`; toast feedback; success state replaces form |
| `CommunitySection` | — | 2×2 grid of social links (Twitter, Discord, Reddit, Instagram) with per-platform hover glow |
| `Footer` | — | Logo, nav links, website + email contact, copyright |

---

### API Routes

#### `GET /api/voices`
- Reads `Sample_Voices/` directory, filters `.wav` files
- Returns `{ id: string, filename: string }[]`

#### `GET /api/voices/:name`
- Streams the requested WAV file from `Sample_Voices/`
- Path-sanitised with `path.basename` to prevent traversal
- Returns `audio/wav` with `Cache-Control: public, max-age=3600`
- 404 JSON if file not found

---

### Services

#### `supabase.ts`
- Initialises `@supabase/supabase-js` client from `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### `betaSignup.service.ts`
- `submitBetaSignup(payload)` — inserts `{ name, email, occupation, usecase }` into `open_narrator_beta_use` table
- Throws friendly error on duplicate email (`error.code === "23505"`)

---

### Data Flow

```
page.tsx ("use client")
  └── Navbar            (client — scroll to #beta, hamburger toggle)
  └── HeroSection       (client — scroll to #beta, open VoiceDemo modal)
        └── HalftoneBackground  (canvas RAF animation)
        └── VoiceDemo   (client — modal, fetches /api/voices, plays /api/voices/:name)
              └── VoiceCard[]   (client — audio playback, progress bar)
  └── FeaturesSection   (server — static)
        └── FeatureCard[]
  └── VideoSection      (server — static)
  └── PricingBlock      (client — scroll to #beta)
  └── BetaSection       (client — form state, Supabase submit, toast)
  └── CommunitySection  (server — static)
  └── Footer            (server — static)
```

---

### Component Hierarchy

```
RootLayout (layout.tsx)
  └── Toaster (react-hot-toast, top-center)
  └── Navbar
  └── main#main-content
      ├── HeroSection
      │     ├── HalftoneBackground
      │     ├── Button × 2 (Get Early Access, Get A Demo)
      │     ├── Badge × 4 (highlights)
      │     └── VoiceDemo (modal, conditionally rendered)
      │           └── VoiceCard × N
      ├── FeaturesSection
      │     └── FeatureCard × 4
      ├── VideoSection
      ├── PricingBlock
      │     └── Button × 3 (one per plan)
      ├── BetaSection
      │     ├── Input × 2 (name, email)
      │     ├── Select × 2 (occupation, useCase)
      │     └── Button (submit)
      ├── CommunitySection
      └── Footer
```

---

### State Management

| Component | State |
|---|---|
| `HeroSection` | `demoOpen: boolean` — controls VoiceDemo modal visibility |
| `VoiceDemo` | `voices[]`, `playingId`, `loading` — voice list + single-active-voice coordination |
| `VoiceCard` | `progress`, `duration` — local audio playback progress via `<audio>` ref |
| `Navbar` | `menuOpen: boolean` — mobile hamburger toggle |
| `BetaSection` | `form: FormState`, `submitted`, `loading` — controlled form + submission state |
| All others | Stateless server components |

---

### Navigation & Routing

- All internal links use `next/link` (`Link`)
- Scroll-to-section via `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`
- Anchor targets: `#features`, `#pricing`, `#community`, `#beta`
- Navbar collapses to hamburger at `< 768px` via `Navbar.module.css` (`@media (min-width: 768px)`)

---

### SEO & Metadata (`layout.tsx`)

- Full `Metadata` object: title template, description, keywords, canonical URL
- OpenGraph and Twitter card tags with OG image
- JSON-LD `SoftwareApplication` structured data (injected `beforeInteractive`)
- `robots.txt` and `sitemap.ts` for crawlability
- `manifest.ts` for PWA support

---

### Design System (`globals.css`)

| Token | Value |
|---|---|
| `--bg-dark` | `#1f1f1e` |
| `--bg-light` | `#FFE8C9` |
| `--text-primary` | `#292829` |
| `--accent-primary` | `#002A86` |
| `--accent-secondary` | `#4F46E5` |
| `--accent-soft` | `#E0E7FF` |
| `--success` | `#16A34A` |
| `--warning` | `#F59E0B` |
| `--gray-300` | `#d4d4d4` |
| `--gray-700` | `#383838` |
| `--gray-900` | `#18181b` |

- Dark-first aesthetic
- Headings: Rajdhani (`--font-rajdhani`)
- UI/body text: Inter (`--font-inter`)
- Tailwind CSS v4 utilities throughout; no Tailwind media prefixes in Navbar (plain CSS used instead)
